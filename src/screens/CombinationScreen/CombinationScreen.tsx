import { pageHOC } from '@src/components/pageHOC/pageHOC';


export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

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

      <a href='/'>Voltar para a home</a>
    </div>
  )
}
