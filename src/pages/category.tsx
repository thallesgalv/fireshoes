import { NextPage } from 'next/types'
import { useEffect, useState } from 'react'
import { MdOutlineFilterAlt } from 'react-icons/md'
import { useGlobalContext } from '../contexts/GlobalContext'
import { useProductContext } from '../contexts/ProductContext'
import {
  FilterContextProvider,
  useFilterContext
} from '../contexts/FilterContext'
import AsideFilters from '../components/AsideFilters'
import ShelfGrid from '../components/ShelfGrid'
import Heading from '../components/Heading'
import Button from '../components/Button'
import Search from '../components/Search'

const Category: NextPage = () => {
  // const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  // const [filteredProducts, setFilteredProducts] = useState<any>(null)

  // const { isMobile } = useGlobalContext()
  // const { getProductsByClient, currentProducts } = useProductContext()
  // const { filterProducts, currentFilters } = useFilterContext()

  // useEffect(() => {
  //   currentProducts || getProductsByClient()
  // }, [])

  // useEffect(() => {
  //   getProductsByClient()
  //   setFilteredProducts(currentProducts)
  // }, [])

  // useEffect(() => {
  //   setFilteredProducts(filterProducts(currentProducts))
  // }, [currentFilters])

  // useEffect(() => {
  //   console.log(currentFilters)
  // }, [])

  // useEffect(() => {
  //   getProductsByClient()
  // }, [])

  return (
    <section className="w-11/12 lg:w-full m-auto">
      <Search />
    </section>
  )
}

export default Category
