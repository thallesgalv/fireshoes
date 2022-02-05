import lottie from 'lottie-web'
import { useEffect, useRef } from 'react'
import EmptyCart from '../../assets/animationEmptyCart.json'

const AnimationEmptyCart = () => {
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

export default AnimationEmptyCart
