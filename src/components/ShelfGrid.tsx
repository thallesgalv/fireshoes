import { Product } from '../contexts/ProductContext'
import AnimationNotFound from './Lottie/AnimationNotFound'
import ShelfItem from './ShelfItem'

interface ShelfGridProps {
  data?: Product[] | null
}

const ShelfGrid = ({ data }: ShelfGridProps) => {
  if (!data || data.length === 0)
    return (
      <div className="w-full flex justify-center items-center flex-col">
        <AnimationNotFound />
        <p className="text-center">Não há produtos que correspondem aos critérios de busca.</p>
      </div>
    )
  return (
    <ul className="grid gap-y-8 lg:grid-cols-3 lg:gap-7 lg:gap-y-14 justify-center">
      {data?.map(({ id, name, price, bestPrice, images, mainImg, sizes }) => (
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
      ))}
    </ul>
  )
}
export default ShelfGrid
