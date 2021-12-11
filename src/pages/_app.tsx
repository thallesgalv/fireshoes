import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { GlobalContextProvider } from '../contexts/GlobalContext'
import showVersion from '../utils/version'
import { AuthContextProvider } from '../contexts/AuthContext'
import Header from '../components/Header'
import Main from '../components/Main'
import { ProductContextProvider } from '../contexts/ProductContext'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../contexts/UserContext'

const MyApp = ({ Component, pageProps }: AppProps) => {
  showVersion()
  return (
    <UserContextProvider>
      <GlobalContextProvider>
        <AuthContextProvider>
          <ProductContextProvider>
            <Header />
            <Main>
              <Component {...pageProps} />
              <Toaster position="bottom-center" />
            </Main>
          </ProductContextProvider>
        </AuthContextProvider>
      </GlobalContextProvider>
    </UserContextProvider>
  )
}

export default MyApp
