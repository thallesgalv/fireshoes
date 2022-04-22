import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Main from '../components/Main'
import LoginPage from '../components/views/Login/LoginPage'
import { LoginContextProvider } from '../contexts/LoginContext'
import { useUserContext } from '../contexts/UserContext'
import { auth } from '../firebase/auth'

const Login: NextPage = () => {
  const { currentUser } = useUserContext()
  const router = useRouter()

  useEffect(() => {
    if (auth.currentUser?.uid) router.push('/')
  }, [currentUser])

  return (
    <Main>
      <Head>
        <title>Login | Fireshoes 🔥</title>
        <meta name="description" content="Área de Login" />
      </Head>
      <LoginContextProvider>
        <LoginPage />
      </LoginContextProvider>
    </Main>
  )
}
export default Login
