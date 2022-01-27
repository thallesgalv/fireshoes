import { useRef } from 'react'
import {
  MdClose,
  MdDeleteOutline,
  MdOutlineExposureNeg1,
  MdOutlineExposurePlus1
} from 'react-icons/md'
import { ProductInCart, useCartContext } from '../contexts/CartContext'
import { useGlobalContext } from '../contexts/GlobalContext'
import { currency } from '../utils/calculations'
import Button from './Button'
import Heading from './Heading'
import { AnimationEmptyCart } from './Lottie'

const MiniCart = () => {
  const { miniCartActive, setMiniCartActive } = useGlobalContext()
  const miniCartContainer = useRef(null)
  const {
    currentCart,
    cartTotalValue,
    savingValue,
    removeFromCart,
    incrementQuantity,
    decrementQuantity
  } = useCartContext()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === miniCartContainer.current) setMiniCartActive(false)
  }

  const handleIncrement = (productId: string) => {
    if (productId) incrementQuantity(productId)
  }

  const handleDecrement = (productId: string) => {
    if (productId) decrementQuantity(productId)
  }

  const handleDeleteFromCart = (product: ProductInCart) => {
    if (product) removeFromCart(product)
  }

  if (!miniCartActive) return null

  return (
    <section
      className=" w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-10 flex justify-end"
      ref={miniCartContainer}
      onClick={handleClick}
    >
      <div className="lg:w-1/5 bg-white p-4 rounded animate-in">
        <div className="flex items-center justify-around">
          <div
            className="text-primary text-4xl cursor-pointer"
            onClick={() => {
              setMiniCartActive(false)
            }}
          >
            <MdClose />
          </div>
          <Heading text="Seu carrinho" center small />
        </div>

        {currentCart?.products?.length ? (
          <div className="h-screen flex flex-col gap-6">
            <ul className="h-fit flex flex-col gap-6 my-6 overflow-y-auto scrollbar pr-2">
              {currentCart.products.map((product) => (
                <li
                  key={product.id}
                  className="border-b-2 pb-4 flex justify-between items-center"
                >
                  <div className="flex gap-6 items-center">
                    <p className="text-primary font-semibold">
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
                      <p className="font-semibold text-sm font-primary uppercase mt-2">
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
                      className="border border-primary bg-primary text-white rounded-full p-1 cursor-pointer"
                      onClick={() => product.id && handleIncrement(product.id)}
                    >
                      <MdOutlineExposurePlus1 />
                    </li>
                    <li
                      className="border border-primary bg-white text-primary rounded-full p-1 cursor-pointer"
                      onClick={() => product.id && handleDecrement(product.id)}
                    >
                      <MdOutlineExposureNeg1 />
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
                <p className="text-sm">
                  Você economizou: {`${currency(savingValue)}`}
                </p>
              )}
            </div>
            <ul className="flex flex-col gap-4 w-2/3 mx-auto mt-auto mb-32">
              <li>
                <Button primary text="Finalizar compra" widthFull />
              </li>
              <li>
                <Button
                  secondary
                  text="Continuar comprando"
                  widthFull
                  onClick={() => setMiniCartActive(false)}
                />
              </li>
            </ul>
          </div>
        ) : (
          <div className="grid place-items-center">
            <AnimationEmptyCart />
            <p className="text-primary text-center">Seu carrinho está vazio.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default MiniCart
