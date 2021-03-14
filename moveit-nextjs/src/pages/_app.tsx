//esse arquivo _app.js serve para reaproveitar uma estrutura 
//prévia entre todas as páginas da nossa aplicação

import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
