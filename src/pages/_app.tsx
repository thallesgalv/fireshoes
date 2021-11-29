import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { GlobalContextProvider } from '../contexts/GlobalContext'
import showVersion from '../utils/version'
import { AuthContextProvider } from '../contexts/AuthContext'
import Header from '../components/Header'
import Main from '../components/Main'
import { ProductContextProvider } from '../contexts/ProductContext'

function MyApp({ Component, pageProps }: AppProps) {
  showVersion()
  return (
    <GlobalContextProvider>
      <AuthContextProvider>
        <ProductContextProvider>
          <Header />
          <Main>
            <Component {...pageProps} />
          </Main>
        </ProductContextProvider>
      </AuthContextProvider>
    </GlobalContextProvider>
  )
}

export default MyApp
