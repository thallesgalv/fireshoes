import { useEffect, useRef, useState } from 'react'
import type { LottiePlayer } from 'lottie-web'
import EmptyCart from '../../assets/animationEmptyCart.json'

const AnimationEmptyCart = () => {
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
        loop: true,
        autoplay: true,
        animationData: EmptyCart
      })
      lottie.setSpeed(0.8)
      return () => animation.destroy()
    }
  }, [lottie])

  return (
    <div className="h-64 w-64">
      <div ref={containerLottie} />
    </div>
  )
}

export default AnimationEmptyCart
