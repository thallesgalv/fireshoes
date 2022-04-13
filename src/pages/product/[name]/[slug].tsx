import Head from 'next/head'
import Main from '../../../components/Main'
import ShelfSlider from '../../../components/ShelfSlider'
import ProductPage from '../../../components/views/Product/ProductPage'
import { FilterContextProvider } from '../../../contexts/FilterContext'
import {
  getProductByServer,
  getProductsByQuery
} from '../../../firebase/firebaseRequests'
import { Product } from '../../../types/interfaces'

interface ProductProps {
  product: Product
  newReleases: Product[]
}

const Product = ({ product, newReleases }: ProductProps) => {
  const { name } = product
  return (
    <Main>
      <Head>
        <title>{name} | Fireshoes 🔥</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <FilterContextProvider>
        <ProductPage product={product} />
      </FilterContextProvider>
      <div className="mt-16">
        <ShelfSlider titleCenter title="Veja também" data={newReleases} />
      </div>
    </Main>
  )
}

export default Product

interface PathProps {
  params: { id: string; slug: string }
}

export const getServerSideProps = async (props: PathProps) => {
  return {
    props: {
      product: await getProductByServer(props.params.slug),
      newReleases: await getProductsByQuery('where')
    }
  }
}
