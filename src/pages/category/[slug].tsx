import { NextPage } from 'next/types'
import { useEffect } from 'react'
import Search from '../../components/Search'
import { Filters, useFilterContext } from '../../contexts/FilterContext'
import { Product } from '../../contexts/ProductContext'
import { getProductsByQuery } from '../../firebase/firebaseRequests'

interface CategoryProps {
  products: Product[]
}

const Category: NextPage<CategoryProps> = ({ products }) => {
  const {
    setFilteredProducts,
    getFilteredProducts,
    filteredProducts,
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
    // let query = getFilteredProducts(filteredProducts)
    // query && query.length
    //   ? setFilteredProducts(query)
    //   : setFilteredProducts(products)
    if (filtersCount !== 0) {
      let query = getFilteredProducts()
      setQueriedProducts(query)
    } else {
      setQueriedProducts(products)
    }

  }, [currentFilters, filtersCount])


  return (
    <section className="w-11/12 lg:w-full m-auto">
      <Search data={queriedProducts ? queriedProducts : []} />
    </section>
  )
}

export default Category

interface PathProps {
  params: { id: string; slug: string }
}

export const getServerSideProps = async (props: PathProps) => {
  return {
    props: {
      products: await getProductsByQuery('where', 'brand', props.params.slug)
    }
  }
}
