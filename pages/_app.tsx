import React from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { globalConfig } from '@src/globalConfig';
import { gtmPageview } from '@src/utils/events/pageview';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  React.useEffect(() => {
    router.events.on('routeChangeComplete', gtmPageview)
    return () => {
      router.events.off('routeChangeComplete', gtmPageview)
    }
  }, [router.events])

  return (
    <>
      {/* Google Tag Manager - Global base code */}
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${globalConfig.GTM_ID}');
          `,
        }}
      />
      <style global jsx>{`
        body {
          font-family: sans-serif;
        }     
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
