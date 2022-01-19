import { Product, useProductContext } from '../contexts/ProductContext'
import Button from './Button'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { currency, getDiscount } from '../utils/calculations'
import { useState } from 'react'
import { AiFillFire } from 'react-icons/ai'
import { useGlobalContext } from '../contexts/GlobalContext'

interface ShelfItemProps extends Product {}

const ShelfItem = ({
  id,
  name,
  price,
  bestPrice,
  images,
  mainImg
}: ShelfItemProps) => {
  const { getProduct, currentProduct } = useProductContext()
  const [currentImage, setCurrentImage] = useState(mainImg)
  const { isMobile } = useGlobalContext()

  const handleMouseOver = () => {
    if (images && images.length > 1) {
      const altImage = images
        .find((photo) => photo !== currentImage)
        ?.toString()

      setCurrentImage(altImage)
    }
  }

  const handleMouseLeave = () => {
    if (images && images.length > 1) {
      setCurrentImage(mainImg)
    }
  }

  const handleProduct = (productId?: string) => {
    if (productId) {
      getProduct(productId)
      console.log(currentProduct)
    }
  }

  return (
    <li
      className={`
        flex flex-col gap-0.5
        ${isMobile ? 'w-full' : 'w-64'}
        relative
      `}
    >
      {bestPrice && price && bestPrice < price && (
        <div className="absolute -right-6 -top-8 flex justify-center items-center">
          <p className="absolute text-white font-primary font-semibold tracking-tighter text-xs mt-4">
            {getDiscount(bestPrice, price)} off
          </p>
          <div className="text-primary">
            <AiFillFire size={75} />
          </div>
        </div>
      )}
      <div
        style={{
          background: `no-repeat center/cover url(${currentImage})`
        }}
        role={`Image: ${name}. Photo by:`}
        className="w-64 h-52 rounded-sm shadow-lg"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      />
      <p className="font-semibold text-xl font-primary uppercase">{name}</p>
      {(!bestPrice || (price && bestPrice >= price)) && (
        <p className="text-xl font-primary uppercase text-primary tracking-tighter">
          <strong className="font-normal "> {`${currency(price)}`}</strong>
        </p>
      )}
      {bestPrice && price && bestPrice < price && (
        <p className="font-normal text-xl font-primary text-primary tracking-tighter">
          <span className="text-lg font-light">
            de{' '}
            <span className=" line-through font-light">{`${currency(
              price
            )}`}</span>{' '}
            por
          </span>
          <strong className="font-normal "> {`${currency(bestPrice)}`}</strong>
        </p>
      )}
      <div className="mt-4">
        <Button
          primary
          text="Adicionar ao Carrinho"
          icon={<MdOutlineShoppingCart />}
          widthFull
          onClick={() => handleProduct(id)}
        />
      </div>
    </li>
  )
}

export default ShelfItem
