import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { GlobalContextProvider } from '../contexts/GlobalContext'
import showVersion from '../utils/version'

function MyApp({ Component, pageProps }: AppProps) {
  showVersion()
  return (
    <GlobalContextProvider>
      <Component {...pageProps} />
    </GlobalContextProvider>
  )
}

export default MyApp
