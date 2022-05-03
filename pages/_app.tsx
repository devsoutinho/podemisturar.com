import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style global jsx>{`
        body {
          font-family: sans-serif;
        }     
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
