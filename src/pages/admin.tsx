import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import AdminPage from '../components/views/Admin/AdminPage'
import Main from '../components/Main'
import { AdminContextProvider, useAdminContext } from '../contexts/AdminContext'
import { Product, useProductContext } from '../contexts/ProductContext'
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
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <AdminContextProvider>
        <AdminPage />
      </AdminContextProvider>
    </Main>
  )
}

export default Admin
