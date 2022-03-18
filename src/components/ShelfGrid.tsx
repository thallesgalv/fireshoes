import { useEffect } from 'react'
import { useFilterContext } from '../contexts/FilterContext'
import { Product, useProductContext } from '../contexts/ProductContext'
import ShelfItem from './ShelfItem'

interface ShelfGridProps {
  data?: Product[] | null
}

const ShelfGrid = () => {
  const { filteredProducts, setFilteredProducts } = useFilterContext()
  const { currentProducts } = useProductContext()

  // useEffect(() => {
  //   setFilteredProducts(currentProducts)
  // }, [])

  // if (!data || data.length === 0) return null
  return (
    <ul className="grid grid-cols-3 gap-7 gap-y-14 justify-center">
      {filteredProducts?.map(
        ({ id, name, price, bestPrice, images, mainImg, sizes }) => (
          <li key={id}>
            <ShelfItem
              id={id}
              name={name}
              price={price}
              bestPrice={bestPrice}
              images={images}
              mainImg={mainImg}
              sizes={sizes}
            />
          </li>
        )
      )}
    </ul>
  )
}
export default ShelfGrid
