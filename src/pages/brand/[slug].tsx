import { NextPage } from 'next/types'
import { useEffect } from 'react'
import Heading from '../../components/Heading'
import Search from '../../components/Search'
import { Filters, useFilterContext } from '../../contexts/FilterContext'
import { Product } from '../../contexts/ProductContext'
import { getProductsByQuery } from '../../firebase/firebaseRequests'

interface BrandProps {
  products: Product[]
}

const Brand: NextPage<BrandProps> = ({ products }) => {
  const {
    setFilteredProducts,
    getFilteredProducts,
    setQueriedProducts,
    currentFilters,
    queriedProducts,
    setCurrentFilters,
    filtersCount
  } = useFilterContext()

  useEffect(() => {
    setCurrentFilters({} as Filters)
    if (products.length) {
      setFilteredProducts(products)
    }
  }, [products])

  useEffect(() => {
    if (filtersCount !== 0) {
      let query = getFilteredProducts()
      setQueriedProducts(query)
    } else {
      setQueriedProducts(products)
    }
  }, [currentFilters, filtersCount, products])

  const [firstProduct] = products
  const { brand } = firstProduct

  return (
    <section className="w-11/12 lg:w-full m-auto">
      <Heading text={brand || ''} center />
      <Search data={queriedProducts ? queriedProducts : []} />
    </section>
  )
}

export default Brand

interface PathProps {
  params: { id: string; slug: string }
}

export const getServerSideProps = async (props: PathProps) => {
  const slug = props.params.slug
  const capitalize = slug.charAt(0).toUpperCase() + slug.slice(1)
  return {
    props: {
      products: await getProductsByQuery('where', 'brand', capitalize)
    }
  }
}
