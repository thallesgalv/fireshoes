import { useEffect } from 'react'
import { Filters, useFilterContext } from '../../../contexts/FilterContext'
import { Product } from '../../../types/interfaces'
import Heading from '../../Heading'
import Search from '../../Search'

interface ProductsPageProps {
  products: Product[]
}

const ProductsPage = ({ products }: ProductsPageProps) => {
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
  }, [currentFilters, filtersCount])

  return (
    <section className="w-11/12 lg:w-full m-auto">
      <Heading text="Catálogo completo" center />
      <Search
        data={queriedProducts ? queriedProducts : []}
        heading="Produtos"
      />
    </section>
  )
}

export default ProductsPage
