export const gtmPageview = (url) => {
  globalThis.dataLayer.push({
    event: 'pageview',
    page: url,
  })
}
