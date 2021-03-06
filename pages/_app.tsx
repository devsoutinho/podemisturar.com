import React from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { globalConfig } from '@src/globalConfig';
import { gtmPageview } from '@src/utils/events/pageview';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});


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
      <style global jsx>{`
        html {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        #__next,
        body {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        a {
          opacity: 1;
          transition: .2s ease-in-out;
          text-decoration: none;
        }
        a:hover,
        a:focus {
          opacity: .5;
        }
      `}</style>
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
