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
// import MiniCart from '../components/MiniCart'
import NextNProgress from 'nextjs-progressbar'
import dynamic from 'next/dynamic'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const DynamicMinicart = dynamic(() => import('../components/MiniCart'))
  // const DynamicNextNProgress = dynamic(() => import('nextjs-progressbar'))

  showVersion()

  return (
    <GlobalContextProvider>
      <CartContextProvider>
        <UserContextProvider>
          <AuthContextProvider>
            <ProductContextProvider>
              <Header />
              <NextNProgress
                color="#F63C3C"
                height={6}
                options={{ showSpinner: false }}
              />
              <DynamicMinicart />
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
          </AuthContextProvider>
        </UserContextProvider>
      </CartContextProvider>
    </GlobalContextProvider>
  )
}

export default MyApp
