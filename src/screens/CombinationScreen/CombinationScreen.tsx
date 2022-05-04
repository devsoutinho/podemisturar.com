import Link from '@src/components/Link/Link';
import { pageHOC } from '@src/components/pageHOC/pageHOC';
import { combinationsService } from '@src/services/combinationsService/combinationsService';


export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

// https://app.graphcms.com/ba2c3bca72f34da980248a473d6de5c6/master/graphiql
/*
query {
  cantCombines(where: {items_some: {name: "Cloro"}}) {
    id
    name
    items {
      name 
    }
    description
  }
}

*/
export async function getStaticProps({ params }) {
  if(!params.combination) return { notFound: true };

  const items = params.combination.split('-com-').map((item) => item.replaceAll('-', ' ').trim());

  const result = await combinationsService().getCombinationOf(items[0], items[1]);
  if(!result.length) return { notFound: true };
  
  console.log('result', result);

  return {
    props: {
      items,
      content: {
        status: 'Não pode!',
        description: result[0].description,
      }
    },
    revalidate: 10, // In seconds
  }  
}

export default pageHOC(CombineScreen);

function CombineScreen({ items, content }) {
  return (
    <div>
      <h1>Pode {items?.join(' com ')}?</h1>
      <h2>{content.status}!</h2>
      <p>{content.description}!</p>

      <Link href='/'>Voltar para a home</Link>
    </div>
  )
}
