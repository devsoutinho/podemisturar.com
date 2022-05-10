import { StructuredText } from "react-datocms";
import Link from '@src/components/Link/Link';
import { pageHOC } from '@src/components/pageHOC/pageHOC';
import { combinationsService } from '@src/services/combinationsService/combinationsService';


export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  if(!params.combination) return { notFound: true };

  const items = params.combination.split('-com-');
  const combinationResult = await combinationsService().getCombinationOf(items[0], items[1]);

  if(!combinationResult) return { notFound: true };
  if(!Object.keys(combinationResult)) return { notFound: true };

  return {
    props: {
      combinationResult,
    },
    revalidate: 10,
  }  
}

export default pageHOC(CombineScreen);

function CombineScreen({ combinationResult }) {
  return (
    <div>
      <h1>Pode misturar {combinationResult.combinationOfItems[0].title} com {combinationResult.combinationOfItems[1].title}?</h1>
      <h2>
        {combinationResult.canCombine ? ('Sim!') : ('Não!')}
        {'  '}
        {combinationResult.reason}
      </h2>
      
      <StructuredText data={combinationResult.explanation} />
      <Link href='/'>Voltar para a home</Link>
    </div>
  )
}
