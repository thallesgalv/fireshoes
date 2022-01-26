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
import { CartContextProvider } from '../contexts/CartContext'
import MiniCart from '../components/MiniCart'

const MyApp = ({ Component, pageProps }: AppProps) => {
  showVersion()
  return (
    <UserContextProvider>
      <GlobalContextProvider>
        <AuthContextProvider>
          <CartContextProvider>
            <ProductContextProvider>
              <Header />
              <MiniCart />
              <Main>
                <Component {...pageProps} />
                <Toaster
                  position="bottom-left"
                  toastOptions={{
                    style: {
                      background: '#F63C3C',
                      color: '#FFF'
                    }
                  }}
                />
              </Main>
            </ProductContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </GlobalContextProvider>
    </UserContextProvider>
  )
}

export default MyApp
