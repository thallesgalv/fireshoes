import { useEffect } from 'react'
import { MdClose, MdSearch } from 'react-icons/md'
import { useHeaderContext } from '../../contexts/HeaderContext'
import { useProductContext } from '../../contexts/ProductContext'

const SearchBar = () => {
  const { handleSearchBar, searchTerm, setSearchTerm } = useHeaderContext()
  const { getProductsByClient, currentProducts } = useProductContext()
  const twIconsStyle = 'text-primary cursor-pointer opacity-50'

  useEffect(() => {
    if (!currentProducts) getProductsByClient()
  }, [])

  return (
    <>
      <div className="p-4 border-t-2 shadow-lg animate-show flex items-center">
        <div className={twIconsStyle}>
          <MdSearch size={24} />
        </div>
        <input
          placeholder="O que você está procurando?"
          className="w-full p-2 font-primary text-md focus:outline-none"
          autoFocus
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className={twIconsStyle} onClick={handleSearchBar}>
          <MdClose size={24} />
        </div>
      </div>
    </>
  )
}

export default SearchBar
