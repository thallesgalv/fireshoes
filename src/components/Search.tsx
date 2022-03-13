import { useEffect, useState } from 'react'
import { MdOutlineFilterAlt } from 'react-icons/md'
import {
  FilterContextProvider,
  useFilterContext
} from '../contexts/FilterContext'
import { useGlobalContext } from '../contexts/GlobalContext'
import { Product, useProductContext } from '../contexts/ProductContext'
import AsideFilters from './AsideFilters'
import Button from './Button'
import Heading from './Heading'
import ShelfGrid from './ShelfGrid'

const Search = () => {
  const { isMobile } = useGlobalContext()
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const { filteredProducts } = useFilterContext()

  // useEffect(() => {
  //   filterProducts(filteredProducts)
  //   // setFilteredProducts(query)
  // }, [currentFilters])

  return (
    <FilterContextProvider>
      <Heading text="Categorias" center />
      {isMobile && (
        <div className="flex justify-center">
          <Button
            primary
            text="Filtros"
            icon={<MdOutlineFilterAlt />}
            onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
          />
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-7 justify-between my-6">
        <div
          className={`
      flex justify-center
      ${!isMobile || isFilterModalOpen ? 'block' : 'hidden'}`}
        >
          <AsideFilters />
        </div>
        <ShelfGrid />
      </div>
    </FilterContextProvider>
  )
}

export default Search
