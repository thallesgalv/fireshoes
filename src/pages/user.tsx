import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Heading from '../components/Heading'
import Main from '../components/Main'
import UserActions from '../components/views/User/UserActions'
import UserOptions from '../components/views/User/UserOptions'
import { useUserContext } from '../contexts/UserContext'
import { UserOptionContextProvider } from '../contexts/UserOptionContext'

const User: NextPage = () => {
  const { currentUser, getUser } = useUserContext()
  const router = useRouter()

  useEffect(() => {
    if (!currentUser?.uid) router.push('/login')
  }, [])

  useEffect(() => {
    getUser()
  }, [])

  if (!currentUser?.uid) return null

  return (
    <Main>
      <Head>
        <title>Área do Usuário | Fireshoes 🔥</title>
        <meta name="description" content="Área do Usuário" />
      </Head>

      <Heading text="Área do Usuário" center />

      <section className="w-11/12 m-auto pt-4 pb-8 md:flex lg:relative">
        <UserOptionContextProvider>
          <UserOptions />
          <UserActions />
        </UserOptionContextProvider>
      </section>
    </Main>
  )
}

export default User
