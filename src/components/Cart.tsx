import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { HiMinusSm, HiPlusSm } from 'react-icons/hi'
import { MdDeleteOutline } from 'react-icons/md'
import { ProductInCart, useCartContext } from '../contexts/CartContext'
import { currency } from '../utils/calculations'
import { checkForPrice } from '../utils/checkForPrice'
import { normalizeString } from '../utils/normalizeString'
import AnimationEmptyCart from './Lottie/AnimationEmptyCart'

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

  const handleIncrement = (productId: string, selectedSize: string) => {
    if (productId) incrementQuantity(productId, selectedSize)
  }

  const handleDecrement = (productId: string, selectedSize: string) => {
    if (productId) decrementQuantity(productId, selectedSize)
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
                key={product.id + product?.selectedSize}
                className="border-b-2 pb-4 flex items-center"
              >
                <Link
                  href={`/product/${normalizeString(product.name)}/${
                    product.id
                  }`}
                >
                  <a>
                    <Image
                      width={80}
                      height={64}
                      src={product.mainImg || '/placeholder.png'}
                      alt={`${product.name}. Image by Unsplash`}
                      className="object-cover rounded-sm shadow-lg cursor-pointer"
                    />
                  </a>
                </Link>

                <div className="flex flex-col justify-between gap-2 w-28 lg:w-28 ml-4">
                  <p className="font-semibold text-sm font-primary uppercase text-dark whitespace-nowrap">
                    {product.name}
                  </p>
                  <div className="flex gap-2">
                    <div className="flex justify-center items-center w-16 bg-red-100 rounded-sm">
                      <button
                        className={`rounded-sm p-1 text-dark ${
                          product.quantity === 1 && 'text-gray-400'
                        }`}
                        disabled={product.quantity === 1}
                        onClick={() =>
                          product.id &&
                          handleDecrement(product.id, product.selectedSize)
                        }
                      >
                        <HiMinusSm size={14} />
                      </button>
                      <p className="p-1 text-dark w-6 text-center text-sm">
                        {product.quantity}
                      </p>
                      <button
                        className={`rounded-sm p-1 text-dark ${
                          product.quantity === 10 && 'text-gray-400'
                        }`}
                        onClick={() =>
                          product.id &&
                          handleIncrement(product.id, product.selectedSize)
                        }
                      >
                        <HiPlusSm size={14} />
                      </button>
                    </div>
                    <div
                      className={`
                        rounded-full flex justify-center items-center p-1 border border-dark
                        text-xs w-6 h-6 cursor-pointer
                      `}
                    >
                      {product.selectedSize}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end w-28 lg:w-28">
                  <button
                    className="text-primary text-lg p-1 cursor-pointer"
                    disabled={product.quantity === 10}
                    onClick={() => handleDeleteFromCart(product)}
                  >
                    <MdDeleteOutline />
                  </button>
                  {checkForPrice(product.price, product.bestPrice)?.price && (
                    <p className="text-sm font-primary text-primary tracking-tighter">
                      <strong className="font-semibold uppercase mr-1">
                        {`${currency(product.price)}`}
                      </strong>
                      un.
                    </p>
                  )}
                  {checkForPrice(product.price, product.bestPrice)
                    ?.bestPrice && (
                    <>
                      <p className="font-normal text-sm font-primary text-primary tracking-tighter">
                        <span className="font-light text-xs lg:text-sm">
                          de{' '}
                          <span className=" line-through font-light text-sm">{`${currency(
                            product.price
                          )}`}</span>{' '}
                          por
                        </span>
                      </p>
                      <strong className="text-sm font-primary uppercase text-primary tracking-tighter font-semibold">
                        {' '}
                        {`${currency(product.bestPrice)}`}
                        <span className="lowercase ml-1 font-normal">un.</span>
                      </strong>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="text-center lg:text-right">
            <p className=" text-primary text-2xl font-semibold">
              Total: {`${currency(cartTotalValue)}`}
            </p>
            {savingValue > 0 && (
              <p className="text-sm text-dark">
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
