//esse arquivo _app.js serve para reaproveitar uma estrutura 
//prévia entre todas as páginas da nossa aplicação

import '../styles/global.css'

import { ChallengesProvider } from '../contexts/ChallengesContext'

function MyApp({ Component, pageProps }) {

  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  )
}

export default MyApp
