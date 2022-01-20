import { DocumentData, QuerySnapshot } from 'firebase/firestore'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import packageInfo from '../../package.json'
import Heading from '../components/Heading'
import Shelf from '../components/Shelf'
import { Product, useProductContext } from '../contexts/ProductContext'

const Index: NextPage = () => {
  const [nikeShelfData, setNikeShelfData] = useState<Product[]>()
  const [asicsShelfData, setAsicsShelfData] = useState<Product[]>()
  const { getProducts, currentProducts, getProductsByQuery } =
    useProductContext()

  useEffect(() => {
    getProducts()
    getProductsByQuery('brand', 'Nike').then((data?: Product[]) =>
      setNikeShelfData(data)
    )
    getProductsByQuery('brand', 'Asics').then((data?: Product[]) =>
      setAsicsShelfData(data)
    )
  }, [])

  return (
    <>
      <Head>
        <title>Fireshoes 🔥</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-11/12 m-auto ">
        <section>
          <Heading text="Home" center />
          <p className="text-center">Versão {packageInfo.version}</p>

          <Shelf data={currentProducts} title="Todos os Produtos" />
          <Shelf data={nikeShelfData} title="Só os Nikess" />
          <Shelf data={asicsShelfData} title="Asics? Temos" />
        </section>
      </main>
    </>
  )
}

export default Index
