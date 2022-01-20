import { DocumentData, QuerySnapshot } from 'firebase/firestore'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import packageInfo from '../../package.json'
import Heading from '../components/Heading'
import Shelf from '../components/Shelf'
import { Product, useProductContext } from '../contexts/ProductContext'
import { getProductsByQuery } from '../utils/getProductsByQuery'

interface IndexProps {
  nikeShelfData: Product[]
  asicsShelfData: Product[]
}

const Index: NextPage<IndexProps> = ({ nikeShelfData, asicsShelfData }) => {
  const { getProducts, currentProducts } = useProductContext()

  useEffect(() => {
    getProducts() // aqui os dados são gerados no cliente não por SSR
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

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      nikeShelfData: await getProductsByQuery('brand', 'Nike'),
      asicsShelfData: await getProductsByQuery('brand', 'Asics')
    }
  }
}

export default Index
