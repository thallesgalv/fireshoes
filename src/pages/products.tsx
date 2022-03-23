import { NextPage } from 'next/types'
import { useEffect } from 'react'
import Search from '../components/Search'
import { Filters, useFilterContext } from '../contexts/FilterContext'
import { Product } from '../contexts/ProductContext'
import { getProductsByServer } from '../firebase/firebaseRequests'

interface ProductsProps {
  allProducts: Product[]
}

const Products: NextPage<ProductsProps> = ({ allProducts }) => {
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
    if (allProducts.length) {
      setFilteredProducts(allProducts)
    }
  }, [allProducts])

  useEffect(() => {
    // let query = getFilteredProducts(filteredProducts)
    // query && query.length
    //   ? setFilteredProducts(query)
    //   : setFilteredProducts(products)
    if (filtersCount !== 0) {
      let query = getFilteredProducts()
      setQueriedProducts(query)
    } else {
      setQueriedProducts(allProducts)
    }
  }, [currentFilters, filtersCount])

  return (
    <section className="w-11/12 lg:w-full m-auto">
      <Search
        data={queriedProducts ? queriedProducts : []}
        heading="Produtos"
      />
    </section>
  )
}

export default Products

interface PathProps {
  params: { id: string; slug: string }
}

export const getServerSideProps = async (props: PathProps) => {
  return {
    props: {
      allProducts: await getProductsByServer()
    }
  }
}
