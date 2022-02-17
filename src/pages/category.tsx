import { NextPage } from 'next/types'
import AsideFilters from '../components/AsideFilters'
import { MdOutlineFilterAlt } from 'react-icons/md'
import Button from '../components/Button'
import { useGlobalContext } from '../contexts/GlobalContext'
import Heading from '../components/Heading'
import { useState } from 'react'
import { FilterContextProvider } from '../contexts/FilterContext'

const Category: NextPage = () => {
  const { isMobile } = useGlobalContext()
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  return (
    <section className="w-11/12 lg:w-full m-auto">
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
            ${!isMobile || isFilterModalOpen ? 'block' : 'hidden'}
          `}
          // bg-red-700 fixed w-full left-0 top-[72px]
        >
          <FilterContextProvider>
            <AsideFilters />
          </FilterContextProvider>
        </div>
        <div>
          <ul className="flex flex-wrap gap-7 justify-center lg:justify-start">
            <li className="w-64 h-52 bg-primary rounded-sm"></li>
            <li className="w-64 h-52 bg-primary rounded-sm"></li>
            <li className="w-64 h-52 bg-primary rounded-sm"></li>
            <li className="w-64 h-52 bg-primary rounded-sm"></li>
            <li className="w-64 h-52 bg-primary rounded-sm"></li>
            <li className="w-64 h-52 bg-primary rounded-sm"></li>
            <li className="w-64 h-52 bg-primary rounded-sm"></li>
            <li className="w-64 h-52 bg-primary rounded-sm"></li>
            <li className="w-64 h-52 bg-primary rounded-sm"></li>
            <li className="w-64 h-52 bg-primary rounded-sm"></li>
            <li className="w-64 h-52 bg-primary rounded-sm"></li>
            <li className="w-64 h-52 bg-primary rounded-sm"></li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Category
