import { currency } from '../../utils/calculations'

interface ProductPriceProps {
  bestPrice?: number
  price?: number
}

const ProductPrice = ({ bestPrice, price }: ProductPriceProps) => {
  if (!bestPrice && !price) return null
  return (
    <div>
      {(!bestPrice || (price && bestPrice >= price)) && (
        <p className="text-3xl font-primary uppercase text-dark tracking-tighter my-4">
          <strong className="font-light ">{`${currency(price)}`}</strong>
        </p>
      )}
      {bestPrice && price && bestPrice < price && (
        <p className="font-normal font-primary text-dark tracking-tighter flex flex-col my-4">
          <span className="font-light text-md">
            de{' '}
            <span className=" line-through font-light text-md">{`${currency(
              price
            )}`}</span>{' '}
            por
          </span>
          <strong className="font-light text-3xl ">
            {' '}
            {`${currency(bestPrice)}`}
          </strong>
        </p>
      )}
    </div>
  )
}

export default ProductPrice
