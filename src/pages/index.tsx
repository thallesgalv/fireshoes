import Head from 'next/head'
import Image from 'next/image'
import type { GetServerSideProps, NextPage } from 'next/types'
import Main from '../components/Main'
import Marquee from '../components/Marquee'
import ShelfSlider from '../components/ShelfSlider'
import CategoriesBanners from '../components/views/Home/CategoriesBanners'
import VideoSection from '../components/views/Home/VideoSection'
import {
  getProductsByQuery,
  getProductsByServer
} from '../firebase/firebaseRequests'
import { Product } from '../types/interfaces'

interface IndexProps {
  allProducts: Product[]
  nikeShelfData: Product[]
  asicsShelfData: Product[]
  pinkShelfData: Product[]
}

const Index: NextPage<IndexProps> = ({
  allProducts,
  nikeShelfData,
  asicsShelfData,
  pinkShelfData
}) => {
  // useEffect(() => {
  //   getProductsByClient() // aqui os dados são gerados no cliente não por SSR
  // }, [])

  // useEffect(() => {
  //   setCurrentProducts(allProducts) //Setando no client dados vindos obtidos via SSR
  // }, [])

  const marqueeList = [
    'A loja de calçados que mais cresce no Brasil',
    'Ofertas especiais na semana do consumidor',
    'Descontos via pix',
    'Visite também: thallesgalvao.com.br',
    'Frete grátis para todo o Brasil',
    'Esta não é uma loja de verdade',
    'Me siga no Github: @thallesgalv'
  ]

  return (
    <>
      <Head>
        <title>Fireshoes 🔥</title>
        <meta
          name="description"
          content="A loja de calçados que mais cresce no Brasil. Tênis de grandes marcas."
        />
      </Head>

      <VideoSection />

      <div className="relative top-[68px]">
        <Marquee list={marqueeList} />
      </div>

      <Main>
        <section className="w-11/12 m-auto">
          <ShelfSlider data={allProducts} title="Lançamentos" />
          <CategoriesBanners />
          <ShelfSlider data={nikeShelfData} title="Nikes? Brabo demais" />
          <ShelfSlider data={asicsShelfData} title="Asics? Temos" />
        </section>
      </Main>

      <div
        className="w-full h-[267px] overflow-hidden"
        style={{ background: "url('/sneakerGif.gif')" }}
      ></div>

      <main className="max-w-screen-xl m-auto pt-10">
        <section className="w-11/12 m-auto">
          <div className="py-10 w-full flex justify-center">
            <Image
              src="/igMock.png"
              alt="Mock ig"
              width={845}
              height={532}
              loading="lazy"
            />
          </div>
          <ShelfSlider data={pinkShelfData} title="Rosa é cor mais quente" />
        </section>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      allProducts: await getProductsByServer(),
      nikeShelfData: await getProductsByQuery('where', 'brand', 'Nike'),
      asicsShelfData: await getProductsByQuery('where', 'brand', 'Asics'),
      pinkShelfData: await getProductsByQuery('array', 'colors', 'Rosa')
    }
  }
}

export default Index
