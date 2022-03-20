import { useState } from 'react'
import { MdOutlineFilterAlt } from 'react-icons/md'
import { useFilterContext } from '../contexts/FilterContext'
import { useGlobalContext } from '../contexts/GlobalContext'
import { Product } from '../contexts/ProductContext'
import AsideFilters from './AsideFilters'
import Button from './Button'
import Heading from './Heading'
import ShelfGrid from './ShelfGrid'

interface SearchProps {
  data: Product[]
}

const Search = ({ data }: SearchProps) => {
  const { isMobile } = useGlobalContext()
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const [name] = data

  return (
    <>
      <Heading text={name?.brand || 'Categorias'} center />
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
      <div className="flex flex-col md:flex-row gap-7 justify-between my-12">
        <div
          className={`
      flex justify-center
      ${!isMobile || isFilterModalOpen ? 'block' : 'hidden'}`}
        >
          <AsideFilters data={data} />
        </div>
        <ShelfGrid data={data} />
      </div>
    </>
  )
}

export default Search
