import { useEffect } from 'react'
import { Filters, useFilterContext } from '../../../contexts/FilterContext'
import { Product } from '../../../contexts/ProductContext'
import Heading from '../../Heading'
import Search from '../../Search'

interface CategoryPageProps {
  category?: string
  products: Product[]
}

const CategoryPage = ({ category, products }: CategoryPageProps) => {
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

  return (
    <section className="w-11/12 lg:w-full m-auto">
      <Heading text={category || ''} center />
      <Search data={queriedProducts ? queriedProducts : []} />
    </section>
  )
}

export default CategoryPage
