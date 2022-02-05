import lottie from 'lottie-web'
import { useEffect, useRef } from 'react'
import Payment from '../../assets/animationPayment.json'

const AnimationPayment = () => {
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

export default AnimationPayment
