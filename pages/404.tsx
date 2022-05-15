import theme from '@src/theme/defaultTheme';
import { Box } from '@src/components/commons/Box/Box';
import { Link } from '@src/components/Link/Link';
import { pageHOC } from '@src/components/pageHOC/pageHOC';
import { Footer } from '@src/components/patterns/Footer/Footer';
import { Logo } from '@src/components/Logo/Logo';
import { Text } from '@src/components/commons/Text/Text';
import { Icon } from '@mui/material';


export default pageHOC(NotFoundScreen);

function NotFoundScreen() {
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
        <Text tag="h1" variant='heading1' styleSheet={{ marginBottom: '40px' }}>
          Opa! Não encontrei a combinação ou a página que você ta procurando :(
        </Text>
        <Text tag="h1" variant='body1' styleSheet={{ marginBottom: '40px' }}>
          Se você tiver alguma sugestão manda pra gente via twitter, mas por hora você pode voltar para a home e fazer outra busca
        </Text>
        <Link href='/' styleSheet={{ display: 'inline-flex' }}><Icon>arrow_back_icon</Icon> Voltar para a home</Link>
      </Box>

      <Footer />
    </Box>
  )
}
