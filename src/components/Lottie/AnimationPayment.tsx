import { useEffect, useRef, useState } from 'react'
import type { LottiePlayer } from 'lottie-web'
import Payment from '../../assets/animationPayment.json'

const AnimationPayment = () => {
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
        animationData: Payment
      })
      lottie.setSpeed(0.8)
      return () => animation.destroy()
    }
  }, [lottie])

  return (
    <div className="opacity-70 h-52 w-52 max-w-xs">
      <div ref={containerLottie} />
    </div>
  )
}

export default AnimationPayment
