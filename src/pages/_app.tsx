import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import NextNProgress from 'nextjs-progressbar'
import { Toaster } from 'react-hot-toast'
import 'tailwindcss/tailwind.css'
import { AuthContextProvider } from '../contexts/AuthContext'
import { CartContextProvider } from '../contexts/CartContext'
import { GlobalContextProvider } from '../contexts/GlobalContext'
import { HeaderContextProvider } from '../contexts/HeaderContext'
import { ProductContextProvider } from '../contexts/ProductContext'
import { UserContextProvider } from '../contexts/UserContext'
import '../styles/globals.css'
import { primary } from '../utils/colorVariables'
import showVersion from '../utils/version'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const Header = dynamic(() => import('../components/Header/Header'))
  const Minicart = dynamic(() => import('../components/MiniCart'))
  const Suggestion = dynamic(() => import('../components/Suggestion'))

  // const [loadingScreen, setLoadingScreen] = useState(false)

  // const router = useRouter()

  // useEffect(() => {
  //   router.events.on('routeChangeStart', handleStart)
  //   router.events.on('routeChangeComplete', handleComplete)
  //   router.events.on('routeChangeError', handleComplete)
  // }, [router])

  // const handleStart = () => {
  //   setLoadingScreen(true)
  // }

  // const handleComplete = () => {
  //   setLoadingScreen(false)
  // }

  showVersion()

  return (
    <GlobalContextProvider>
      <CartContextProvider>
        <UserContextProvider>
          <AuthContextProvider>
            <ProductContextProvider>
              <HeaderContextProvider>
                <Header />
                <Suggestion />
              </HeaderContextProvider>
              <NextNProgress
                color={primary}
                height={6}
                options={{ showSpinner: false }}
              />
              <Minicart />

              {/* {loadingScreen ? <p>Loading</p> : <Component {...pageProps} />} */}
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
        </UserContextProvider>
      </CartContextProvider>
    </GlobalContextProvider>
  )
}

export default MyApp
