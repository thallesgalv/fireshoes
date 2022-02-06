import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { useGlobalContext } from '../contexts/GlobalContext'
import { Product } from '../contexts/ProductContext'
import { useCartContext } from '../contexts/CartContext'
import { currency } from '../utils/calculations'
import { normalizeString } from '../utils/normalizeString'
import Button from './Button'
import Flag from './Flag'

interface ShelfItemProps extends Product {}

const ShelfItem = (product: ShelfItemProps) => {
  const { addToCart } = useCartContext()
  const { isMobile } = useGlobalContext()
  const [currentImage, setCurrentImage] = useState(product.mainImg)

  const handleMouseOver = () => {
    if (isMobile && product.images && product.images.length > 1) {
      const altImage = product.images.find((photo) => photo !== currentImage)

      setCurrentImage(altImage)
    }
  }

  const handleMouseLeave = () => {
    if (isMobile && product.images && product.images.length > 1) {
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
      <div className="relative">
        <Flag
          price={product.price}
          bestPrice={product.bestPrice}
          productId={product.id}
        />
        <Link href={`/product/${normalizeString(product?.name)}/${product.id}`}>
          <a>
            <Image
              src={currentImage || ''}
              width={256}
              height={208}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              alt={`${product.name}. Image by Unsplash`}
              className="object-cover rounded-sm shadow-lg cursor-pointer"
              layout="fixed"
              placeholder="blur"
              blurDataURL={currentImage}
            />
          </a>
        </Link>
      </div>
      <p className="font-semibold text-xl font-primary uppercase text-dark">
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
