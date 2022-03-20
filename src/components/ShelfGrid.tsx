import { useEffect } from 'react'
import { useFilterContext } from '../contexts/FilterContext'
import { Product } from '../contexts/ProductContext'
import ShelfItem from './ShelfItem'

interface ShelfGridProps {
  data?: Product[] | null
}

const ShelfGrid = ({ data }: ShelfGridProps) => {
  const { filteredProducts, setFilteredProducts } = useFilterContext()

  useEffect(() => {
    if (data) setFilteredProducts(data)
  }, [])

  // if (!data || data.length === 0) return null
  return (
    <ul className="grid gap-y-8 lg:grid-cols-3 lg:gap-7 lg:gap-y-14 justify-center">
      {filteredProducts?.map(
        ({ id, name, price, bestPrice, images, mainImg, sizes }) => (
          <li key={id}>
            <ShelfItem
              displayType="grid"
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
