import { Product } from '../contexts/ProductContext'
import Button from './Button'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { currency, getDiscount } from '../utils/calculations'
import { useState } from 'react'
import { useGlobalContext } from '../contexts/GlobalContext'
import { useCartContext } from '../contexts/CartContext'
import Flag from './Flag'
import Link from 'next/link'
import { normalizeString } from '../utils/normalizeString'

interface ShelfItemProps extends Product {}

const ShelfItem = (product: ShelfItemProps) => {
  const { addToCart } = useCartContext()
  const { isMobile } = useGlobalContext()
  const [currentImage, setCurrentImage] = useState(product.mainImg)

  const handleMouseOver = () => {
    if (product.images && product.images.length > 1) {
      const altImage = product.images
        .find((photo) => photo !== currentImage)
        ?.toString()

      setCurrentImage(altImage)
    }
  }

  const handleMouseLeave = () => {
    if (product.images && product.images.length > 1) {
      setCurrentImage(product.mainImg)
    }
  }

  const handleProduct = (product?: Product) => {
    if (product) {
      addToCart({ ...product, quantity: 1 })
    }
  }

  return (
    <div
      className={`
        flex flex-col gap-0.5
        ${isMobile ? 'w-full' : 'w-64'}
        relative
      `}
    >
      <Flag
        price={product.price}
        bestPrice={product.bestPrice}
        productId={product.id}
      />
      <Link href={`/product/${normalizeString(product?.name)}/${product.id}`}>
        <div
          style={{
            background: `no-repeat center/cover url(${currentImage})`
          }}
          role={`Image: ${product.name}. Photo by:`}
          className="w-64 h-52 rounded-sm shadow-lg cursor-pointer"
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        />
      </Link>

      <p className="font-semibold text-xl font-primary uppercase text-secondary">
        {product.name}
      </p>
      {(!product.bestPrice ||
        (product.price && product.bestPrice >= product.price)) && (
        <p className="text-xl font-primary uppercase text-primary tracking-tighter">
          <strong className="font-normal ">
            {' '}
            {`${currency(product.price)}`}
          </strong>
        </p>
      )}
      {product.bestPrice && product.price && product.bestPrice < product.price && (
        <p className="font-normal text-xl font-primary text-primary tracking-tighter">
          <span className="text-lg font-light">
            de{' '}
            <span className=" line-through font-light">{`${currency(
              product.price
            )}`}</span>{' '}
            por
          </span>
          <strong className="font-normal ">
            {' '}
            {`${currency(product.bestPrice)}`}
          </strong>
        </p>
      )}
      <div className="mt-4">
        <Button
          primary
          text="Adicionar ao Carrinho"
          icon={<MdOutlineShoppingCart />}
          widthFull
          onClick={() => handleProduct(product)}
        />
      </div>
    </div>
  )
}

export default ShelfItem
