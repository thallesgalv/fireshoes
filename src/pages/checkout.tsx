import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
  MdDone,
  MdOutlineCreditCard,
  MdOutlineLocationOn,
  MdOutlineShoppingCart
} from 'react-icons/md'
import Button from '../components/Button'
import DeliveryAdressInterface from '../components/DeliveryAdress/DeliveryAdressInterface'
import Heading from '../components/Heading'
import Main from '../components/Main'
import PaymentMethodInterface from '../components/PaymentMethod/PaymentMethodInterface'
import { useCartContext } from '../contexts/CartContext'
import { useGlobalContext } from '../contexts/GlobalContext'
import { useUserContext } from '../contexts/UserContext'
import { auth } from '../firebase/auth'

const Checkout: NextPage = () => {
  const Cart = dynamic(() => import('../components/Cart'))
  const OrderResume = dynamic(() => import('../components/OrderResume'))

  const {
    setMiniCartActive,
    checkoutStep,
    setCheckoutStep,
    sucessOrder,
    setSucessOrder
  } = useGlobalContext()
  const { currentCart, cartTotalValue, setOrder } = useCartContext()
  const { currentUser } = useUserContext()

  const router = useRouter()

  useEffect(() => {
    setMiniCartActive(false)
    setSucessOrder(false)
  }, [])

  useEffect(() => {
    if (sucessOrder) router.push('/sucess')
  }, [sucessOrder])

  const handleContinueFromCart = () => {
    if (!auth.currentUser?.uid) {
      router.push('/login')
    } else {
      setCheckoutStep('adress')
    }
  }

  const handleBackToCart = () => {
    setCheckoutStep('cart')
  }

  const handleContinueFromAdress = () => {
    if (!auth.currentUser?.uid) {
      router.push('/login')
    }

    if (currentUser?.adressList?.length) {
      setCheckoutStep('payment')
    }
  }

  const handleBackToAdress = () => {
    setCheckoutStep('adress')
  }

  const handleContinueFromPayment = () => {
    if (!auth.currentUser?.uid) {
      router.push('/login')
    }

    if (currentUser?.paymentMethodList?.length) {
      setCheckoutStep('confirmation')
    }
  }

  const handleOrderConfirmation = () => {
    setOrder()
  }

  return (
    <Main>
      <Head>
        <title>Checkout | Fireshoes ????</title>
        <meta name="description" content="??rea de Checkout" />
      </Head>
      <Heading text="Checkout" center />

      <section className="w-11/12 lg:w-full m-auto">
        <div>
          <ul className="flex justify-center my-12 gap-8 text-5xl text-primary ">
            <li
              className={`flex flex-col items-center ${
                checkoutStep !== 'cart' && 'opacity-50'
              }`}
            >
              <MdOutlineShoppingCart />
              <span className="text-xs">Carrinho</span>
            </li>
            <li
              className={`flex flex-col items-center ${
                checkoutStep !== 'adress' && 'opacity-50'
              }`}
            >
              <MdOutlineLocationOn />
              <span className="text-xs">Entrega</span>
            </li>
            <li
              className={`flex flex-col items-center ${
                checkoutStep !== 'payment' && 'opacity-50'
              }`}
            >
              <MdOutlineCreditCard />
              <span className="text-xs">Pagamento</span>
            </li>
            <li
              className={`flex flex-col items-center ${
                checkoutStep !== 'sucess' && 'opacity-50'
              }`}
            >
              <MdDone />
              <span className="text-xs">Sucesso</span>
            </li>
          </ul>
        </div>
        {checkoutStep === 'cart' && (
          <div className="w-full md:w-max m-auto animate-show">
            <Cart />
            {currentCart?.products?.length ? (
              <div className="flex justify-center lg:justify-end my-8">
                <Button
                  primary
                  text="Continuar"
                  onClick={handleContinueFromCart}
                />
              </div>
            ) : (
              <div className="flex justify-center my-8">
                <Link href="/">
                  <a>
                    <Button primary text="Ir ??s compras" />
                  </a>
                </Link>
              </div>
            )}
          </div>
        )}
        {checkoutStep === 'adress' && (
          <div className="w-full m-auto animate-show">
            <Heading text="Endere??o de entrega:" center small />
            <DeliveryAdressInterface orientation="horizontal" />

            <div
              className="
                  flex justify-center flex-col-reverse gap-6 w-2/3  mx-auto mt-20
                   md:flex-row md:w-96
                "
            >
              <Button
                secondary
                widthFull
                text="Voltar para o carinho"
                onClick={handleBackToCart}
              />
              <Button
                widthFull
                primary
                text="Confirmar Endere??o"
                disabled={!currentUser?.adressList?.length}
                onClick={handleContinueFromAdress}
              />
            </div>
          </div>
        )}
        {checkoutStep === 'payment' && (
          <div className="w-full m-auto animate-show">
            <Heading text="Meio de pagamento:" center small />
            <PaymentMethodInterface orientation="horizontal" />

            <div
              className="
                  flex justify-center flex-col-reverse gap-6 w-2/3 md:w-96 mx-auto mt-20
                   md:flex-row md:lg-full
                "
            >
              <Button
                secondary
                widthFull
                text="Voltar para Endere??o"
                onClick={handleBackToAdress}
              />
              <Button
                widthFull
                primary
                text="Confirmar Pagamento"
                disabled={!currentUser?.paymentMethodList?.length}
                onClick={handleContinueFromPayment}
              />
            </div>
          </div>
        )}
        {checkoutStep === 'confirmation' && (
          <div className="w-full m-auto animate-show">
            <Heading text="Confirmar pedido" center small />
            <OrderResume
              products={currentCart.products}
              totalValue={cartTotalValue}
              adressList={currentUser?.adressList}
              selectedAdress={currentUser?.selectedAdress}
              paymentMethodList={currentUser?.paymentMethodList}
              selectedPaymentMethod={currentUser?.selectedPaymentMethod}
            />
            <div className="flex justify-center my-6">
              <Button
                primary
                text="Confirmar pedido"
                onClick={handleOrderConfirmation}
              />
            </div>
          </div>
        )}
      </section>
    </Main>
  )
}

export default Checkout
