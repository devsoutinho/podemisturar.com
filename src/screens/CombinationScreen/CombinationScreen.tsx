import { StructuredText } from "react-datocms";
import theme from '@src/theme/defaultTheme';
import { Box } from '@src/components/commons/Box/Box';
import { Link } from '@src/components/Link/Link';
import { pageHOC } from '@src/components/pageHOC/pageHOC';
import { combinationsService } from '@src/services/combinationsService/combinationsService';
import { Footer } from '@src/components/patterns/Footer/Footer';
import { Logo } from '@src/components/Logo/Logo';
import { Text } from '@src/components/commons/Text/Text';
import { Icon } from '@mui/material';


export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  if (!params.combination) return { notFound: true };

  const items = params.combination.split('-com-');
  const combinationResult = await combinationsService().getCombinationOf(items[0], items[1]);

  if (!combinationResult) return { notFound: true };
  if (!Object.keys(combinationResult)) return { notFound: true };

  return {
    props: {
      combinationResult,
    },
    revalidate: 10,
  }
}

export default pageHOC(CombineScreen);

function CombineScreen({ combinationResult }) {
  const title0Alternate = !!combinationResult.combinationOfItems[0]?.alternateTitle.length && `(${combinationResult.combinationOfItems[0]?.alternateTitle.map(i => i.title)})`;
  const title1Alternate = !!combinationResult.combinationOfItems[1]?.alternateTitle.length && `(${combinationResult.combinationOfItems[1]?.alternateTitle.map(i => i.title)})`;
  console.log(combinationResult.combinationOfItems[1]?.alternateTitle);

  const title = `
    Pode misturar ${combinationResult.combinationOfItems[0].title} ${title0Alternate || ''} com ${combinationResult.combinationOfItems[1].title} ${title1Alternate || ''}? 
  `;
  return (
    <Box
      tag="main"
      styleSheet={{
        display: 'grid',
        flex: 1,
        backgroundColor: theme.colors.neutral.x050,
      }}
    >
      <Box
        styleSheet={{
          width: { sm: '900px' },
          alignSelf: 'center',
          justifySelf: { sm: 'center' },
          boxShadow: theme.shadow.md,
          borderRadius: theme.borderRadius.md,
          margin: theme.space.x4,
          padding: theme.space.x6,
          backgroundColor: theme.colors.neutral.x000,
        }}
      >
        <Box styleSheet={{ marginBottom: '50px' }}>
          <Logo />
        </Box>
        <Text tag="h1" variant='heading3' styleSheet={{ marginBottom: '40px' }}>
          {title}
        </Text>
        <Text tag="h2" variant='heading4'>
          {combinationResult.canCombine ? ('Sim, pode!') : ('Não pode!')}
          {'  '}
          {combinationResult.reason}
        </Text>

        <StructuredText data={combinationResult.explanation} />
        <Link href='/' styleSheet={{ display: 'inline-flex' }}><Icon>arrow_back_icon</Icon> Voltar para a home</Link>
      </Box>

      <Footer />
    </Box>
  )
}
