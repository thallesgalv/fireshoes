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

const SpecificProduct = ({ product, newReleases }: ProductProps) => {
  const { name, description, brand } = product
  return (
    <Main>
      <Head>
        <title>{name} | Fireshoes 🔥</title>
        <meta
          name="description"
          content={`Fireshoes. ${name}: ${description}. Marca: ${brand}`}
        />
      </Head>

      <FilterContextProvider>
        <ProductPage product={product} />
      </FilterContextProvider>
      <div className="mt-16 w-11/12 m-auto">
        <ShelfSlider titleCenter title="Veja também" data={newReleases} />
      </div>
    </Main>
  )
}

export default SpecificProduct

interface PathProps {
  params: { id: string; slug: string }
}

export const getStaticProps = async (props: PathProps) => {
  return {
    props: {
      product: await getProductByServer('uzZotPLyv2TyxkMsnnMK'),
      newReleases: await getProductsByQuery('where')
    },
    revalidate: 60 * 10 // 10 minutes
  }
}

// const Mock = () => {
//   return (
//     <div>
//       <h1>specific-id Mock</h1>
//     </div>
//   )
// }

// export default Mock
