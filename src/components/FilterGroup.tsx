import { FilterOptionType, useFilterContext } from '../contexts/FilterContext'
import FilterOption from './FilterOption'

interface FilterGroupProps {
  filterArray: (string | undefined)[] | null | undefined
  option: FilterOptionType
  showSelecteds?: boolean
}

const FilterGroup = ({
  filterArray,
  option,
  showSelecteds
}: FilterGroupProps) => {
  const { checkIfFilterIsSelected, toggleInFilters } = useFilterContext()

  return (
    <ul className="flex justify-center gap-2 lg:gap-1 flex-wrap items">
      {filterArray?.map((filter, idx) => (
        <li key={idx}>
          <FilterOption
            text={filter}
            onClick={() => toggleInFilters(option, filter)}
            hidden={!showSelecteds && checkIfFilterIsSelected(option, filter)}
            active={showSelecteds && checkIfFilterIsSelected(option, filter)}
          />
        </li>
      ))}
    </ul>
  )
}

export default FilterGroup
