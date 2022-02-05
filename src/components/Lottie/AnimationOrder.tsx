import lottie from 'lottie-web'
import { useEffect, useRef } from 'react'
import Order from '../../assets/animationOrder.json'

const AnimationOrder = () => {
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

export default AnimationOrder
