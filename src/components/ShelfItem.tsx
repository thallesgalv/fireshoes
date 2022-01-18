import { Product, useProductContext } from '../contexts/ProductContext'
import Button from './Button'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { DiscountFlag } from './Svgs'
import { currency, getDiscount } from '../utils/calculations'

interface ShelfItemProps extends Product {}

const ShelfItem = ({ id, name, price, bestPrice, mainImg }: ShelfItemProps) => {
  const { getProduct, currentProduct } = useProductContext()

  const handleProduct = (productId?: string) => {
    if (productId) {
      getProduct(productId)
      console.log(currentProduct)
    }
  }
  return (
    <li className=" flex flex-col gap-0.5 w-72 relative">
      {bestPrice && price && bestPrice < price && (
        <div className="absolute -right-6 -top-6 flex justify-center items-center animate-bounce">
          <p className="absolute text-white font-primary font-semibold tracking-tighter text-sm">
            {getDiscount(bestPrice, price)} off
          </p>
          <DiscountFlag />
        </div>
      )}
      <img src={mainImg} alt={name} className="rounded-sm shadow-lg" />
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

      <Button
        primary
        text="Adicionar ao Carrinho"
        icon={<MdOutlineShoppingCart />}
        widthFull
        onClick={() => handleProduct(id)}
      />
    </li>
  )
}

export default ShelfItem
