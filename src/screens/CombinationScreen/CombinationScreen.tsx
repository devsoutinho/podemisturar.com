import Link from '@src/components/Link/Link';
import { pageHOC } from '@src/components/pageHOC/pageHOC';


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
export function getStaticProps({ params }) {
  if(!params.combination) return { notFound: true };

  const items = params.combination.split('-com-');

  return {
    props: {
      items,
      content: {
        status: 'Pode',
        description: 'Não tem nenhum problema em misturar...',
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
