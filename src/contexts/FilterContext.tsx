import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import toast from 'react-hot-toast'
import { checkForPrice } from '../utils/checkForPrice'
import { Product, useProductContext } from './ProductContext'

export interface Filters {
  brand?: (string | undefined)[] | null
  colors?: (string | undefined)[] | null
  sizes?: (string | undefined)[] | null
  priceRange?: PriceRange[]
}
export interface PriceRange {
  min: number
  max: number
  text: string
}

export type FilterOptionType = 'brand' | 'colors' | 'sizes' | 'priceRange'

interface FilterContextProps {
  filters: Filters
  setFilters: (arg: Filters) => void
  currentFilters: Filters
  setCurrentFilters: (arg: Filters) => void
  filtersCount: number
  setFiltersCount: (arg: number) => void
  filteredProducts: Product[] | undefined
  setFilteredProducts: (arg: Product[] | undefined) => void
  checkIfFilterIsSelected: (
    option: FilterOptionType,
    value?: string | PriceRange | undefined
  ) => boolean | undefined
  toggleInFilters: (
    option: FilterOptionType,
    value?: string | PriceRange | undefined
  ) => void
  getFiltersCount: () => void
  getFilteredProducts: (products?: Product[] | undefined) => Product[] | null
  getBrands: (currentProducts: Product[]) => (string | undefined)[] | null
  getColors: (currentProducts: Product[]) => string[] | null
  getSizes: (currentProducts: Product[]) => string[] | null
}

interface FilterContextProviderProps {
  children: ReactNode
}

export const FilterContext = createContext({} as FilterContextProps)

export const FilterContextProvider = ({
  children
}: FilterContextProviderProps) => {
  const [filters, setFilters] = useState({} as Filters)
  const [currentFilters, setCurrentFilters] = useState({} as Filters)
  const [filtersCount, setFiltersCount] = useState(0)
  const [filteredProducts, setFilteredProducts] = useState<
    Product[] | undefined
  >(undefined)
  const { currentProducts, getProductsByClient } = useProductContext()

  useEffect(() => {
    getProductsByClient()
  }, [])

  // useEffect(() => {
  //   setFilteredProducts(currentProducts)
  // }, [])

  useEffect(() => {
    let query = getFilteredProducts(currentProducts)
    query && query.length
      ? setFilteredProducts(query)
      : setFilteredProducts([])
  }, [currentFilters])

  const checkIfFilterIsSelected = (
    option: FilterOptionType,
    value?: string | PriceRange
  ): boolean | undefined => {
    return option === 'priceRange'
      ? currentFilters[option]?.some((i) => i.text === value)
      : currentFilters[option]?.some((i) => i === value)
  }

  const toggleInFilters = (
    option: FilterOptionType,
    value?: string | PriceRange
  ) => {
    const isSelected = checkIfFilterIsSelected(option, value)

    if (isSelected) {
      removeFromFilters(option, value)
    } else {
      addToFilters(option, value)
    }
  }

  const addToFilters = (
    option: FilterOptionType,
    value?: string | PriceRange
  ) => {
    setCurrentFilters({
      ...currentFilters,
      [option]: currentFilters[option]
        ? [...(currentFilters[option] as string[]), value]
        : [value]
    })
    toast.success(`Novo filtro adicionado.`)
  }

  const removeFromFilters = (
    option: FilterOptionType,
    value?: string | PriceRange
  ) => {
    option === 'priceRange'
      ? setCurrentFilters({
          ...currentFilters,
          [option]: currentFilters?.priceRange?.filter(
            (price) => price.text !== value
          )
        })
      : setCurrentFilters({
          ...currentFilters,
          [option]: currentFilters[option]?.filter((el) => el !== value)
        })

    if (filtersCount === 0) setCurrentFilters({} as Filters)
    toast.success(`Filtro removido.`)
  }

  const getFiltersCount = () => {
    let count = 0
    let currentKeys = Object.entries(currentFilters)
    currentKeys.forEach((key) => {
      const [, filterOption] = key
      count += filterOption.length
    })
    setFiltersCount(count)
  }

  const doAFilter = (selectFilter: FilterOptionType, poolArray: Product[]) => {
    if (currentFilters.priceRange && selectFilter === 'priceRange') {
      const [selectPriceRange] = currentFilters.priceRange

      return poolArray.filter((p) => {
        const findPrice = checkForPrice(p.price, p.bestPrice)
        const selectedPrice = findPrice?.bestPrice || findPrice?.price

        if (selectedPrice) {
          return (
            selectedPrice >= selectPriceRange.min &&
            selectedPrice <= selectPriceRange.max
          )
        }
      })
    }

    return poolArray.filter((p: any) => {
      return currentFilters[selectFilter]?.some((e) =>
        p[selectFilter].includes(e)
      )
    })
  }

  const getFilteredProducts = (products?: Product[]) => {
    if (products) {
      let search: Product[] = []
      let result: Product[] = []
      const query = Object.keys(currentFilters)

      query.forEach((f: any, idx) => {
        if (idx === 0) {
          const [firstFilter]: any = query
          search = doAFilter(firstFilter, products)
        } else {
          search = doAFilter(f, result)
        }

        result = search
      })

      return result
    }
    return null
  }

  const getBrands = (currentProducts: Product[]) => {
    if (currentProducts) {
      const uniques = new Set(currentProducts.map((product) => product.brand))
      return uniques ? Array.from(uniques).sort() : null
    }
    return null
  }

  const getColors = (currentProducts: Product[]) => {
    if (currentProducts) {
      let colorArray: string[] = []
      currentProducts.forEach((product) => {
        if (product.colors) colorArray = [...colorArray, ...product.colors]
      })
      const uniques = new Set(colorArray)
      return uniques ? Array.from(uniques).sort() : null
    }
    return null
  }

  const getSizes = (currentProducts: Product[]) => {
    if (currentProducts) {
      let sizeArray: string[] = []
      currentProducts.forEach((product) => {
        if (product.sizes) sizeArray = [...sizeArray, ...product.sizes]
      })
      const uniques = new Set(sizeArray)
      return uniques ? Array.from(uniques).sort() : null
    }
    return null
  }

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        currentFilters,
        setCurrentFilters,
        filtersCount,
        setFiltersCount,
        filteredProducts,
        setFilteredProducts,
        checkIfFilterIsSelected,
        toggleInFilters,
        getFiltersCount,
        getFilteredProducts,
        getBrands,
        getColors,
        getSizes
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  return useContext(FilterContext)
}
