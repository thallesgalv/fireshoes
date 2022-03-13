import { NextPage } from 'next/types'
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
