import { useEffect } from 'react'
import { useFilterContext } from '../contexts/FilterContext'
import { useProductContext } from '../contexts/ProductContext'
import FilterGroup from './FilterGroup'
import FilterOption from './FilterOption'

const AsideFilters = () => {
  const {
    currentFilters,
    getFiltersCount,
    setFilters,
    filters,
    toggleInFilters,
    getBrands,
    getColors,
    getSizes,
    checkIfFilterIsSelected,
    filtersCount
  } = useFilterContext()

  const { getProducts, currentProducts } = useProductContext()

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    getFiltersCount()
  }, [currentFilters])

  useEffect(() => {
    let isMounted = true

    if (isMounted && currentProducts) {
      setFilters({
        ...filters,
        brands: getBrands(currentProducts),
        colors: getColors(currentProducts),
        sizes: getSizes(currentProducts)
      })
    }

    return () => {
      isMounted = false
    }
  }, [currentProducts])

  return (
    <aside
      className="
      border-2 border-primary rounded-sm shadow-lg
      p-4 h-fit w-72 lg:w-64 max-w-xs"
    >
      <div className=" border-b py-3">
        <h3 className="text-center text-md text-primary font-semibold whitespace-nowrap">
          Filtros selecionados: ({filtersCount})
        </h3>
        <ul className="flex gap-2 lg:gap-1 flex-wrap items">
          {currentFilters.brands && (
            <FilterGroup
              filterArray={currentFilters.brands}
              option={'brands'}
              showSelecteds
            />
          )}
          {currentFilters.colors && (
            <FilterGroup
              filterArray={currentFilters.colors}
              option={'colors'}
              showSelecteds
            />
          )}
          {currentFilters.sizes && (
            <FilterGroup
              filterArray={currentFilters.sizes}
              option={'sizes'}
              showSelecteds
            />
          )}
          {currentFilters &&
            currentFilters?.priceRange?.map((priceRange, idx) => (
              <li key={idx}>
                <FilterOption
                  text={priceRange.text}
                  onClick={() => toggleInFilters('priceRange', priceRange.text)}
                  active={checkIfFilterIsSelected(
                    'priceRange',
                    priceRange.text
                  )}
                />
              </li>
            ))}
        </ul>
      </div>
      <div className=" border-b py-3">
        <h3 className="text-center text-md text-primary font-semibold mb-2">
          Marca:
        </h3>
        <FilterGroup filterArray={filters.brands} option={'brands'} />
      </div>
      <div className="border-b py-3">
        <h3 className="text-center text-md text-primary font-semibold mb-2">
          Cor:
        </h3>
        <FilterGroup filterArray={filters?.colors} option={'colors'} />
      </div>
      <div className="border-b py-3">
        <h3 className="text-center text-md text-primary font-semibold mb-2">
          Tamanho:
        </h3>
        <FilterGroup filterArray={filters?.sizes} option={'sizes'} />
      </div>
      <div className="py-3">
        <h3 className="text-center text-md text-primary font-semibold mb-2">
          Preço:
        </h3>
        <ul className="flex gap-2 lg:gap-1 flex-wrap items">
          <li>
            <FilterOption
              text="R$50 - R$ 100"
              hidden={checkIfFilterIsSelected('priceRange', 'R$50 - R$ 100')}
              onClick={() =>
                toggleInFilters('priceRange', {
                  min: 50,
                  max: 100,
                  text: 'R$50 - R$ 100'
                })
              }
            />
          </li>
          <li>
            <FilterOption
              text="R$101 - R$ 150"
              hidden={checkIfFilterIsSelected('priceRange', 'R$101 - R$ 150')}
              onClick={() =>
                toggleInFilters('priceRange', {
                  min: 101,
                  max: 150,
                  text: 'R$101 - R$ 150'
                })
              }
            />
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default AsideFilters
