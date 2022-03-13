import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { useCartContext } from '../contexts/CartContext'
import { useGlobalContext } from '../contexts/GlobalContext'
import { Product } from '../contexts/ProductContext'
import { currency } from '../utils/calculations'
import { checkForPrice } from '../utils/checkForPrice'
import { normalizeString } from '../utils/normalizeString'
import Button from './Button'
import Flag from './Flag'

interface ShelfItemProps extends Product {}

const ShelfItem = (product: ShelfItemProps) => {
  const { addToCart, selectedSize, setSelectedSize } = useCartContext()
  const { isMobile } = useGlobalContext()
  const [currentImage, setCurrentImage] = useState(product.mainImg)
  const [showSizes, setShowSizes] = useState(false)

  const handleMouseOverImage = () => {
    if (!isMobile && product.images && product.images.length > 1) {
      const altImage = product.images.find((photo) => photo !== currentImage)
      setCurrentImage(altImage)
    }
  }

  const handleMouseLeaveImage = () => {
    if (!isMobile && product.images && product.images.length > 1) {
      setCurrentImage(product.mainImg)
    }
  }

  const handleMouseOverCartButton = () => {
    setShowSizes(true)
  }

  const handleMouseLeaveCartButton = () => {
    setShowSizes(false)
    setSelectedSize('')
  }

  const handleProduct = (product?: Product) => {
    if (product) {
      addToCart({ ...product, quantity: 1, selectedSize: selectedSize })
    }
  }

  return (
    <div
      className={`
        flex flex-col gap-0.5
        ${isMobile ? 'w-full' : 'w-64'}
        relative
      `}
      onMouseLeave={handleMouseLeaveCartButton}
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
              onMouseOver={handleMouseOverImage}
              onMouseLeave={handleMouseLeaveImage}
              alt={`${product.name}. Image by Unsplash`}
              className="object-cover rounded-sm shadow-lg cursor-pointer"
              layout="fixed"
              placeholder="blur"
              blurDataURL={currentImage}
            />
          </a>
        </Link>

        {product.sizes && showSizes && (
          <div className="flex justify-center items-center gap-2 bg-black bg-opacity-40 rounded-b-sm p-2 animate-showreverse absolute bottom-2 w-full">
            {product.sizes.sort().map((size, idx) => (
              <div
                key={idx}
                className={`
                    rounded-full flex justify-center items-center p-1 border
                    text-xs w-6 h-6 cursor-pointer border-primary
                    ${
                      selectedSize === size
                        ? 'bg-primary text-white'
                        : 'bg-white text-primary'
                    }
                `}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="font-semibold text-xl font-primary uppercase text-dark">
        {product.name}
      </p>
      {checkForPrice(product.price, product.bestPrice)?.price && (
        <p className="text-xl font-primary uppercase text-primary tracking-tighter">
          <strong className="font-normal ">
            {' '}
            {`${currency(product.price)}`}
          </strong>
        </p>
      )}
      {checkForPrice(product.price, product.bestPrice)?.bestPrice && (
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
          onMouseOver={handleMouseOverCartButton}
        />
      </div>
    </div>
  )
}

export default ShelfItem
