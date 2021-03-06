import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Main from '../components/Main'
import AdminPage from '../components/views/Admin/AdminPage'
import { AdminContextProvider } from '../contexts/AdminContext'
import { useProductContext } from '../contexts/ProductContext'
import { useUserContext } from '../contexts/UserContext'

const Admin: NextPage = () => {
  const router = useRouter()
  const { currentUser } = useUserContext()
  const { getProductsByClient } = useProductContext()

  useEffect(() => {
    if (!currentUser?.isAdmin) router.push('/')
    getProductsByClient()
  }, [])

  if (!currentUser?.isAdmin) return null

  return (
    <Main>
      <Head>
        <title>Administrador | Fireshoes 🔥</title>
        <meta name="description" content="Área de administrador" />
      </Head>
      <AdminContextProvider>
        <AdminPage />
      </AdminContextProvider>
    </Main>
  )
}

export default Admin
