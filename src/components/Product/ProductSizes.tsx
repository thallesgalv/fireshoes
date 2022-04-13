import { useCartContext } from '../../contexts/CartContext'

interface ProductSizesProps {
  sizes?: string[]
}

const ProductSizes = ({ sizes }: ProductSizesProps) => {
  const { selectedSize, setSelectedSize } = useCartContext()

  if (!sizes || sizes?.length === 0) return null
  return (
    <div className="flex">
      {sizes.length > 1 ? 'Tamanhos: ' : 'Tamanho: '}
      <div className="flex gap-1 ml-2">
        {sizes.sort().map((size, idx) => (
          <div
            key={idx}
            className={`
              rounded-full flex justify-center items-center p-1 border border-dark
              text-xs w-6 h-6 cursor-pointer
              ${selectedSize === size && 'bg-dark text-white'}
            `}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductSizes
