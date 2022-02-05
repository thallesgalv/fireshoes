import 'tailwindcss/tailwind.css'
import dynamic from 'next/dynamic'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NextNProgress from 'nextjs-progressbar'
import { Toaster } from 'react-hot-toast'
import { GlobalContextProvider } from '../contexts/GlobalContext'
import { AuthContextProvider } from '../contexts/AuthContext'
import { ProductContextProvider } from '../contexts/ProductContext'
import { UserContextProvider } from '../contexts/UserContext'
import { CartContextProvider } from '../contexts/CartContext'
// import Header from '../components/Header'
import Main from '../components/Main'
import showVersion from '../utils/version'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [loadingScreen, setLoadingScreen] = useState(false)
  const Minicart = dynamic(() => import('../components/MiniCart'))
  const Header = dynamic(() => import('../components/Header'))
  // const Main = dynamic(() => import('../components/Main'))
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)
  }, [router])

  const handleStart = () => {
    setLoadingScreen(true)
  }

  const handleComplete = () => {
    setLoadingScreen(false)
  }

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
              <Minicart />
              <Main>
                {loadingScreen ? <p>Loading</p> : <Component {...pageProps} />}
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
