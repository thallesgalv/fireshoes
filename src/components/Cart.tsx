import { ReactNode } from 'react'
import {
  MdOutlineExposurePlus1,
  MdOutlineExposureNeg1,
  MdDeleteOutline
} from 'react-icons/md'
import { useCartContext, ProductInCart } from '../contexts/CartContext'
import { currency } from '../utils/calculations'
import { AnimationEmptyCart } from './Lottie'

interface CartProps {
  children?: ReactNode
  heightScreen?: boolean
}

const Cart = ({ children, heightScreen }: CartProps) => {
  const {
    currentCart,
    cartTotalValue,
    savingValue,
    removeFromCart,
    incrementQuantity,
    decrementQuantity
  } = useCartContext()

  const handleIncrement = (productId: string) => {
    if (productId) incrementQuantity(productId)
  }

  const handleDecrement = (productId: string) => {
    if (productId) decrementQuantity(productId)
  }

  const handleDeleteFromCart = (product: ProductInCart) => {
    if (product) removeFromCart(product)
  }

  return (
    <>
      {currentCart?.products?.length ? (
        <div className={`flex flex-col gap-6 ${heightScreen && 'h-screen'}`}>
          <ul className="h-fit flex flex-col gap-6 my-6 overflow-y-auto scrollbar pr-2">
            {currentCart.products.map((product) => (
              <li
                key={product.id}
                className="border-b-2 pb-4 flex justify-between items-center"
              >
                <div className="flex gap-6 items-center">
                  <p className="w-4 text-primary font-semibold ">
                    x{product.quantity}
                  </p>
                  <div>
                    <div
                      style={{
                        background: `no-repeat center/cover url(${product.mainImg})`
                      }}
                      role={`Image: ${product.name}. Photo by:`}
                      className="w-24 h-16 rounded-sm shadow-lg"
                    />
                    <p className="font-semibold text-sm font-primary uppercase mt-2 text-secondary">
                      {product.name}
                    </p>
                    {(!product.bestPrice ||
                      (product.price &&
                        product.bestPrice >= product.price)) && (
                      <p className="text-sm font-primary uppercase text-primary tracking-tighter">
                        <strong className="font-semibold ">
                          {`${currency(product.price)}`}
                        </strong>
                      </p>
                    )}
                    {product.bestPrice &&
                      product.price &&
                      product.bestPrice < product.price && (
                        <p className="font-normal text-sm font-primary text-primary tracking-tighter">
                          <span className="font-light text-sm">
                            de{' '}
                            <span className=" line-through font-light text-sm">{`${currency(
                              product.price
                            )}`}</span>{' '}
                            por
                          </span>
                          <strong className="font-semibold ">
                            {' '}
                            {`${currency(product.bestPrice)}`}
                          </strong>
                        </p>
                      )}
                  </div>
                </div>
                <ul className="flex gap-2">
                  <li
                    className="border border-primary bg-white text-primary rounded-full p-1 cursor-pointer"
                    onClick={() => product.id && handleDecrement(product.id)}
                  >
                    <MdOutlineExposureNeg1 />
                  </li>
                  <li
                    className="border border-primary bg-primary text-white rounded-full p-1 cursor-pointer"
                    onClick={() => product.id && handleIncrement(product.id)}
                  >
                    <MdOutlineExposurePlus1 />
                  </li>

                  <li
                    className="text-primary text-lg p-1 cursor-pointer"
                    onClick={() => handleDeleteFromCart(product)}
                  >
                    <MdDeleteOutline />
                  </li>
                </ul>
              </li>
            ))}
          </ul>

          <div className="text-center lg:text-right">
            <p className=" text-primary text-2xl font-semibold">
              Total: {`${currency(cartTotalValue)}`}
            </p>
            {savingValue > 0 && (
              <p className="text-sm text-secondary">
                Você economizou: {`${currency(savingValue)}`}
              </p>
            )}
          </div>
          {children}
        </div>
      ) : (
        <div className="grid place-items-center">
          <AnimationEmptyCart />
          <p className="text-primary text-center">Seu carrinho está vazio.</p>
        </div>
      )}
    </>
  )
}

export default Cart
