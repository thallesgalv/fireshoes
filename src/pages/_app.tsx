import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import SplashScreen from '../components/SplashScreen'
import { AuthContextProvider } from '../contexts/AuthContext'
import { CartContextProvider } from '../contexts/CartContext'
import { GlobalContextProvider } from '../contexts/GlobalContext'
import { HeaderContextProvider } from '../contexts/HeaderContext'
import { ProductContextProvider } from '../contexts/ProductContext'
import { UserContextProvider } from '../contexts/UserContext'
import '../styles/globals.css'
import '../styles/nprogress.css'
import { primary } from '../utils/colorVariables'
import showVersion from '../utils/version'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const Header = dynamic(() => import('../components/Header/Header'), {
    ssr: false
  })
  const Minicart = dynamic(() => import('../components/MiniCart'), {
    ssr: false
  })
  const Suggestion = dynamic(() => import('../components/Suggestion'), {
    ssr: false
  })

  NProgress.configure({ showSpinner: false })

  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => NProgress.start())
    router.events.on('routeChangeComplete', () => NProgress.done())
    router.events.on('routeChangeError', () => NProgress.done())
  }, [])

  useEffect(() => {
    setIsLoading(false)
  }, [])

  showVersion()

  if (isLoading) return <SplashScreen />
  return (
    <GlobalContextProvider>
      <UserContextProvider>
        <CartContextProvider>
          <AuthContextProvider>
            <ProductContextProvider>
              <HeaderContextProvider>
                <Header />
                <Suggestion />
              </HeaderContextProvider>
              <Minicart />

              {/* {loadingScreen ? <h1 style={{fontSize: 400}}>Loading</h1> : <Component {...pageProps} />} */}
              <Component {...pageProps} />
              <Toaster
                position="bottom-left"
                toastOptions={{
                  style: {
                    background: primary,
                    color: '#FFF'
                  }
                }}
              />
            </ProductContextProvider>
          </AuthContextProvider>
        </CartContextProvider>
      </UserContextProvider>
    </GlobalContextProvider>
  )
}

export default MyApp
