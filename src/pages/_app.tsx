import 'tailwindcss/tailwind.css'
import dynamic from 'next/dynamic'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { Toaster } from 'react-hot-toast'
import { GlobalContextProvider } from '../contexts/GlobalContext'
import { AuthContextProvider } from '../contexts/AuthContext'
import { ProductContextProvider } from '../contexts/ProductContext'
import { UserContextProvider } from '../contexts/UserContext'
import { CartContextProvider } from '../contexts/CartContext'
import Main from '../components/Main'
import showVersion from '../utils/version'
import { primary } from '../utils/colorVariables'
import '../styles/globals.css'


const MyApp = ({ Component, pageProps }: AppProps) => {
  const Minicart = dynamic(() => import('../components/MiniCart'))
  const Header = dynamic(() => import('../components/Header'))

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
              <Header />
              <NextNProgress
                color={primary}
                height={6}
                options={{ showSpinner: false }}
              />
              <Minicart />
              <Main>
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
              </Main>
            </ProductContextProvider>
          </AuthContextProvider>
        </UserContextProvider>
      </CartContextProvider>
    </GlobalContextProvider>
  )
}

export default MyApp
