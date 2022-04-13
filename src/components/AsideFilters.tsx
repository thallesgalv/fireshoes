import { useEffect } from 'react'
import { useFilterContext } from '../contexts/FilterContext'
import { Product } from '../types/interfaces'
import FilterGroup from './FilterGroup'
import FilterOption from './FilterOption'

interface AsideFiltersProps {
  data: Product[]
}

const AsideFilters = ({ data }: AsideFiltersProps) => {
  const {
    currentFilters,
    getFiltersCount,
    setFilters,
    filters,
    toggleInFilters,
    getBrands,
    getCategories,
    getColors,
    getSizes,
    checkIfFilterIsSelected,
    filtersCount,
    filteredProducts
  } = useFilterContext()

  useEffect(() => {
    getFiltersCount()
  }, [currentFilters])

  useEffect(() => {
    let isMounted = true

    if (isMounted && data) {
      setFilters({
        ...filters,
        category: getCategories(data),
        brand: getBrands(data),
        colors: getColors(data),
        sizes: getSizes(data)
      })
    }

    return () => {
      isMounted = false
    }
  }, [filteredProducts])

  if (!data.length && !filteredProducts?.length) return null
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
          {currentFilters.category && (
            <FilterGroup
              filterArray={currentFilters.category}
              option={'category'}
              showSelecteds
            />
          )}
          {currentFilters.brand && (
            <FilterGroup
              filterArray={currentFilters.brand}
              option={'brand'}
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
          Categoria:
        </h3>
        <FilterGroup filterArray={filters.category} option={'category'} />
      </div>
      <div className=" border-b py-3">
        <h3 className="text-center text-md text-primary font-semibold mb-2">
          Marca:
        </h3>
        <FilterGroup filterArray={filters.brand} option={'brand'} />
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
              text="R$1 - R$ 50"
              hidden={checkIfFilterIsSelected('priceRange', 'R$1 - R$ 50')}
              onClick={() =>
                toggleInFilters('priceRange', {
                  min: 1,
                  max: 50,
                  text: 'R$1 - R$ 50'
                })
              }
            />
          </li>
          <li>
            <FilterOption
              text="R$51 - R$ 100"
              hidden={checkIfFilterIsSelected('priceRange', 'R$51 - R$ 100')}
              onClick={() =>
                toggleInFilters('priceRange', {
                  min: 51,
                  max: 100,
                  text: 'R$51 - R$ 100'
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
          <li>
            <FilterOption
              text="R$151 - R$ 200"
              hidden={checkIfFilterIsSelected('priceRange', 'R$151 - R$ 200')}
              onClick={() =>
                toggleInFilters('priceRange', {
                  min: 151,
                  max: 200,
                  text: 'R$151 - R$ 200'
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
