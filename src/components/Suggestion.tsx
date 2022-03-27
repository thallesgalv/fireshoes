import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useHeaderContext } from '../contexts/HeaderContext'
import { Product, useProductContext } from '../contexts/ProductContext'
import ShelfGrid from './ShelfGrid'

const Suggestion = () => {
  const {
    searchTerm,
    handleSearchBar,
    searchBarActive,
    setSearchBarActive,
    setSearchTerm
  } = useHeaderContext()
  const { currentProducts } = useProductContext()
  const [queried, setQueried] = useState<Product[]>([])
  const outside = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (searchTerm) {
      if (currentProducts) {
        const products = currentProducts
          .filter((product) => {
            return product.name
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())
          })
          .slice(0, 3)
        products.length ? setQueried(products) : setQueried([])
      }
    } else {
      setQueried([])
    }
  }, [searchTerm])

  useEffect(() => {
    if (!searchBarActive) {
      setSearchTerm('')
    }
  }, [searchBarActive])

  useEffect(() => {
    router.events.on('beforeHistoryChange', handleRouteChange)
  }, [router])

  const handleRouteChange = () => {
    setSearchBarActive(false)
  }

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === outside.current) handleSearchBar()
  }

  if (!searchBarActive) return null
  return (
    <div
      className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-20 overflow-y-scroll"
      onClick={(e) => handleClickOutside(e)}
      ref={outside}
    >
      {searchTerm ? (
        <div className="bg-white w-11/12 md:w-1/2 md:h-96 relative top-40 mx-auto p-8 rounded-sm shadow-lg animate-show">
          <ShelfGrid data={queried} />
        </div>
      ) : null}
    </div>
  )
}

export default Suggestion
