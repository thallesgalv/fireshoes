import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { useCartContext } from '../contexts/CartContext'
import { useGlobalContext } from '../contexts/GlobalContext'
import { Product } from '../types/interfaces'
import { currency } from '../utils/calculations'
import { checkForPrice } from '../utils/checkForPrice'
import { normalizeString } from '../utils/normalizeString'
import Button from './Button'
import Flag from './Flag'

interface ShelfItemProps extends Product {
  displayType: ShelfItemDisplayOptions
}

type ShelfItemDisplayOptions = 'grid' | 'slider'

const ShelfItem = ({ displayType, ...props }: ShelfItemProps) => {
  const { addToCart, selectedSize, setSelectedSize } = useCartContext()
  const { isMobile } = useGlobalContext()
  const [currentImage, setCurrentImage] = useState(props.mainImg)
  const [showSizes, setShowSizes] = useState(false)

  const handleMouseOverImage = () => {
    if (!isMobile && props.images && props.images.length > 1) {
      const altImage = props.images.find((photo) => photo !== currentImage)
      setCurrentImage(altImage)
    }
  }

  const handleMouseLeaveImage = () => {
    if (!isMobile && props.images && props.images.length > 1) {
      setCurrentImage(props.mainImg)
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
        flex
        ${displayType === 'slider' ? 'flex-col gap-0.5' : null}
        ${
          displayType === 'grid'
            ? 'flex-row lg:flex-col gap-4 lg:gap-0.5'
            : null
        }
        ${isMobile ? 'w-full' : 'w-64'}
        relative
      `}
      onMouseLeave={handleMouseLeaveCartButton}
    >
      <div className="relative">
        <Flag
          price={props.price}
          bestPrice={props.bestPrice}
          productId={props.id}
          small={displayType === 'grid' && isMobile ? true : false}
        />
        <Link href={`/product/${normalizeString(props?.name)}/${props.id}`}>
          <a>
            <Image
              src={currentImage || '/placeholder.png'}
              width={displayType === 'slider' || !isMobile ? 256 : 128}
              height={displayType === 'slider' || !isMobile ? 208 : 112}
              onMouseOver={handleMouseOverImage}
              onMouseLeave={handleMouseLeaveImage}
              alt={`${props.name}. Image by Unsplash`}
              className="object-cover rounded-sm shadow-lg cursor-pointer"
              layout="fixed"
              placeholder="blur"
              blurDataURL={currentImage || '/placeholder.png'}
            />
          </a>
        </Link>

        {props.sizes && showSizes && (
          <div className="flex justify-center items-center gap-2 bg-black bg-opacity-40 rounded-b-sm p-2 animate-showreverse absolute bottom-2 w-full">
            {props.sizes.sort().map((size, idx) => (
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
      <div>
        <p
          className={`font-semibold font-primary uppercase text-dark
           ${displayType === 'grid' ? 'text-md lg:text-xl' : null}
           ${displayType === 'slider' ? 'text-xl' : null}
           `}
        >
          {props.name}
        </p>
        {checkForPrice(props.price, props.bestPrice)?.price && (
          <p
            className={`font-primary uppercase text-primary tracking-tighter
              ${displayType === 'grid' ? 'text-sm lg:text-xl' : null}
              ${displayType === 'slider' ? 'text-xl' : null}
            `}
          >
            <strong className="font-normal ">
              {' '}
              {`${currency(props.price)}`}
            </strong>
          </p>
        )}
        {checkForPrice(props.price, props.bestPrice)?.bestPrice && (
          <p
            className={`font-primary font-normal text-primary tracking-tighter
              ${displayType === 'grid' ? 'text-sm lg:text-xl' : null}
              ${displayType === 'slider' ? 'text-xl' : null}
            `}
          >
            <span
              className={`font-light
              ${displayType === 'grid' ? 'text-sm lg:text-xl' : null}
              ${displayType === 'slider' ? 'text-xl' : null}
              `}
            >
              de{' '}
              <span className=" line-through font-light">{`${currency(
                props.price
              )}`}</span>{' '}
              por
            </span>
            <strong className="font-normal ">
              {' '}
              {`${currency(props.bestPrice)}`}
            </strong>
          </p>
        )}
        <div className="mt-4">
          <Button
            primary
            text="Adicionar ao Carrinho"
            icon={<MdOutlineShoppingCart />}
            widthFull
            onClick={() => handleProduct(props)}
            onMouseOver={handleMouseOverCartButton}
          />
        </div>
      </div>
    </div>
  )
}

export default ShelfItem
