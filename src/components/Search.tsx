import { useState } from 'react'
import { MdOutlineFilterAlt } from 'react-icons/md'
import { useGlobalContext } from '../contexts/GlobalContext'
import { Product } from '../contexts/ProductContext'
import AsideFilters from './AsideFilters'
import Button from './Button'
import ShelfGrid from './ShelfGrid'

interface SearchProps {
  data: Product[]
  heading?: string
}

const Search = ({ data, heading }: SearchProps) => {
  const { isMobile } = useGlobalContext()
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  return (
    <>
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
