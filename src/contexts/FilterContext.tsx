import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import toast from 'react-hot-toast'
import { checkForPrice } from '../utils/checkForPrice'
import { Product } from '../types/interfaces'

export interface Filters {
  brand?: (string | undefined)[] | null
  category?: (string | undefined)[] | null
  colors?: (string | undefined)[] | null
  sizes?: (string | undefined)[] | null
  priceRange?: PriceRange[]
}
export interface PriceRange {
  min: number
  max: number
  text: string
}

export type FilterOptionType = 'category' |'brand' | 'colors' | 'sizes' | 'priceRange'

interface FilterContextProps {
  filters: Filters
  setFilters: (state: Filters) => void
  currentFilters: Filters
  setCurrentFilters: (state: Filters) => void
  filtersCount: number
  setFiltersCount: (state: number) => void
  filteredProducts: Product[] | undefined
  setFilteredProducts: (state: Product[] | undefined) => void
  queriedProducts: Product[] | undefined
  setQueriedProducts: (state: Product[] | undefined) => void
  checkIfFilterIsSelected: (
    option: FilterOptionType,
    value?: string | PriceRange | undefined
  ) => boolean | undefined
  toggleInFilters: (
    option: FilterOptionType,
    value?: string | PriceRange | undefined
  ) => void
  getFiltersCount: () => void
  getFilteredProducts: () => Product[] | undefined
  getCategories: (currentProducts: Product[]) => (string | undefined)[] | null
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
  const [queriedProducts, setQueriedProducts] = useState<Product[] | undefined>(
    filteredProducts
  )

  useEffect(() => {
    if (filtersCount === 0) {
      setCurrentFilters({} as Filters)
    }
  }, [filtersCount])

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

  const getFilteredProducts = () => {
    let search: Product[] = []
    let result = filteredProducts

    if (currentFilters.category && currentFilters.category.length) {
      currentFilters.category.forEach((category) => {
        if (category) {
          const query = result?.filter((product) => {
            if (product.category) return product?.category === category
          })
          if (query) search = query.length ? [...search, ...query] : []
        }
      })
      const unique = new Set(search)
      result = [...Array.from(unique)]
      search = []
    }

    if (currentFilters.brand && currentFilters.brand.length) {
      currentFilters.brand.forEach((brand) => {
        if (brand) {
          const query = result?.filter((product) => {
            if (product.brand) return product?.brand === brand
          })
          if (query) search = query.length ? [...search, ...query] : []
        }
      })
      const unique = new Set(search)
      result = [...Array.from(unique)]
      search = []
    }

    if (currentFilters.colors && currentFilters.colors.length) {
      currentFilters.colors.forEach((color) => {
        if (color) {
          const query = result?.filter((product) => {
            if (product.colors) return product?.colors.includes(color)
          })
          if (query) search = query.length ? [...search, ...query] : []
        }
      })
      const unique = new Set(search)
      result = [...Array.from(unique)]
      search = []
    }

    if (currentFilters.sizes && currentFilters.sizes.length) {
      currentFilters.sizes.forEach((size) => {
        if (size) {
          const query = result?.filter((product) => {
            if (product.sizes) return product?.sizes.includes(size)
          })
          if (query) search = query.length ? [...search, ...query] : []
        }
      })

      const unique = new Set(search)
      result = [...Array.from(unique)]
      search = []
    }

    if (currentFilters.priceRange && currentFilters.priceRange.length) {
      const [selectPriceRange] = currentFilters.priceRange
      let findedMax = selectPriceRange?.min
      let findedMin = selectPriceRange?.max

      currentFilters.priceRange.forEach((priceRange) => {
        if (priceRange.max > findedMax) findedMax = priceRange.max
        if (priceRange.min < findedMin) findedMin = priceRange.min
      })

      const query = result?.filter((product) => {
        const findPrice = checkForPrice(product.price, product.bestPrice)
        const selectedPrice = findPrice?.bestPrice || findPrice?.price

        if (selectedPrice) {
          return selectedPrice >= findedMin && selectedPrice <= findedMax
        }
      })

      if (query) search = query.length ? [...search, ...query] : []
      const unique = new Set(search)
      result = [...Array.from(unique)]
      search = []
    }

    return result
  }

  const getCategories = (currentProducts: Product[]) => {
    if (currentProducts) {
      const uniques = new Set(
        currentProducts.map((product) => product.category)
      )
      return uniques ? Array.from(uniques).sort() : null
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
        queriedProducts,
        setQueriedProducts,
        getCategories,
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
