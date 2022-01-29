import type { NextPage } from 'next'
import Head from 'next/head'
import Heading from '../components/Heading'
import Cart from '../components/Cart'
import { useEffect, useState } from 'react'
import { useGlobalContext } from '../contexts/GlobalContext'
import {
  MdDone,
  MdOutlineCreditCard,
  MdOutlineLocationOn,
  MdOutlineShoppingCart
} from 'react-icons/md'
import Button from '../components/Button'
import { useCartContext } from '../contexts/CartContext'
import Link from 'next/link'
import { auth } from '../services/firebase'
import Router from 'next/router'
import DeliveryAdress from '../components/DeliveryAdress'
import PaymentMethod from '../components/PaymentMethod'
import { AnimationCelebration } from '../components/Lottie'
import { useUserContext } from '../contexts/UserContext'

const Checkout: NextPage = () => {
  const { setMiniCartActive, checkoutStep, setCheckoutStep } =
    useGlobalContext()
  const { currentCart } = useCartContext()
  const { currentUser } = useUserContext()

  useEffect(() => {
    setMiniCartActive(false)
    setCheckoutStep('cart')
    console.log('boolean', !!currentUser?.adressList?.length)
    console.log('boolean', currentUser?.adressList?.length)
  }, [])

  const handleContinueFromCart = () => {
    if (!auth.currentUser?.uid) {
      Router.push('/login')
    } else {
      setCheckoutStep('adress')
    }
  }

  const handleBackToCart = () => {
    setCheckoutStep('cart')
  }

  const handleContinueFromAdress = () => {
    if (!auth.currentUser?.uid) {
      Router.push('/login')
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
      Router.push('/login')
    }

    if (currentUser?.paymentMethodList?.length) {
      setCheckoutStep('sucess')
    }
  }

  return (
    <>
      <Head>
        <title>Fireshoes 🔥 | Checkout</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
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
          <>
            <div className="w-full md:w-1/2 m-auto animate-show">
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
                      <Button primary text="Ir às compras" />
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
        {checkoutStep === 'adress' && (
          <>
            <div className="w-full lg:w-1/3 m-auto animate-show">
              <Heading text="Endereço de entrega:" center small />
              <DeliveryAdress orientation="horizontal" />

              <div
                className="
                  flex justify-center flex-col-reverse gap-6 w-1/2 md:w-96 mx-auto mt-20
                   md:flex-row md:lg-full
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
                  text="Confirmar Endereço"
                  disabled={!currentUser?.adressList?.length}
                  onClick={handleContinueFromAdress}
                />
              </div>
            </div>
          </>
        )}
        {checkoutStep === 'payment' && (
          <>
            <div className="w-full lg:w-1/3 m-auto animate-show">
              <Heading text="Meio de pagamento:" center small />
              <PaymentMethod orientation="horizontal" />

              <div
                className="
                  flex justify-center flex-col-reverse gap-6 w-1/2 md:w-96 mx-auto mt-20
                   md:flex-row md:lg-full
                "
              >
                <Button
                  secondary
                  widthFull
                  text="Voltar para Endereço"
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
          </>
        )}
        {checkoutStep === 'sucess' && (
          <>
            <Heading text="Pedido confirmado!"/>
            <p className="text-center">Detalher da compra que vai no user...</p>
            <AnimationCelebration />
          </>
        )}
      </section>
    </>
  )
}

export default Checkout
