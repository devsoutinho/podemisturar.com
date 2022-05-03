import NextHead from 'next/head';

export function Head({ title, description }) {
  const info = {
    title: title,
    description: description,
    image: 'https://via.placeholder.com/800x600',
  }

  return (
    <NextHead>
      {/* <!-- Primary Meta Tags --> */}
      <title>{info.title}</title>
      <meta name="title" content={info.title} />
      <meta name="description" content={info.description} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      {/* <meta property="og:url" content={info.url} /> */}
      <meta property="og:title" content={info.title} />
      <meta property="og:description" content={info.description} />
      <meta property="og:image" content={info.image} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      {/* <meta property="twitter:url" content={info.url} /> */}
      <meta property="twitter:title" content={info.title} />
      <meta property="twitter:description" content={info.description} />
      <meta property="twitter:image" content={info.image} />
    </NextHead>
  )
}
