import type { LottiePlayer } from 'lottie-web'
import { useEffect, useRef, useState } from 'react'
import Order from '../../assets/animationOrder.json'

const AnimationOrder = () => {
  const containerLottie = useRef<HTMLDivElement>(null)
  const [lottie, setLottie] = useState<LottiePlayer | null>(null)

  useEffect(() => {
    import('lottie-web').then((Lottie) => setLottie(Lottie.default))
  }, [])

  useEffect(() => {
    if (lottie && containerLottie.current) {
      const animation = lottie.loadAnimation({
        container: containerLottie.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: Order
      })
      lottie.setSpeed(0.8)
      return () => animation.destroy()
    }
  }, [lottie])

  return (
    <div className="opacity-70 h-64 w-64">
      <div ref={containerLottie} />
    </div>
  )
}

export default AnimationOrder
