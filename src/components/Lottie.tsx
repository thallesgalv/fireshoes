import lottie from 'lottie-web'
import { useEffect, useRef } from 'react'
import Adress from '../assets/animationAdress.json'
import Payment from '../assets/animationPayment.json'
import Order from '../assets/animationOrder.json'
import EmptyCart from '../assets/animationEmptyCart.json'
import Celebration from '../assets/animationCelebration.json'
import Fire from '../assets/animationFire.json'

export const AnimationAdress = () => {
  const containerLottie = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerLottie.current) {
      lottie.loadAnimation({
        container: containerLottie.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: Adress
      })
    }
    lottie.setSpeed(1.3)
  }, [])

  return (
    <div className="opacity-70 max-w-xs">
      <div ref={containerLottie} />
    </div>
  )
}

export const AnimationPayment = () => {
  const containerLottie = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerLottie.current) {
      lottie.loadAnimation({
        container: containerLottie.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: Payment
      })
    }
    lottie.setSpeed(0.8)
  }, [])

  return (
    <div className="opacity-70 h-52 w-52 max-w-xs">
      <div ref={containerLottie} />
    </div>
  )
}

export const AnimationOrder = () => {
  const containerLottie = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerLottie.current) {
      lottie.loadAnimation({
        container: containerLottie.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: Order
      })
    }
    lottie.setSpeed(0.8)
  }, [])

  return (
    <div className="opacity-70 h-64 w-64">
      <div ref={containerLottie} />
    </div>
  )
}

export const AnimationEmptyCart = () => {
  const containerLottie = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerLottie.current) {
      lottie.loadAnimation({
        container: containerLottie.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: EmptyCart
      })
    }
    lottie.setSpeed(0.8)
  }, [])

  return (
    <div className="h-64 w-64">
      <div ref={containerLottie} />
    </div>
  )
}

export const AnimationCelebration = () => {
  const containerLottie = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerLottie.current) {
      lottie.loadAnimation({
        container: containerLottie.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: Celebration
      })
    }
    lottie.setSpeed(0.8)
  }, [])

  return (
    <div className="w-3/4 m-auto">
      <div ref={containerLottie} />
    </div>
  )
}

export const AnimationFire = () => {
  const containerLottie = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerLottie.current) {
      lottie.loadAnimation({
        container: containerLottie.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: Fire
      })
    }
    lottie.setSpeed(0.8)
  }, [])

  return (
    <div className="w-10 h-10">
      <div ref={containerLottie} />
    </div>
  )
}
