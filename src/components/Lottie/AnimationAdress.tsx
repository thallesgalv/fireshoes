import { useEffect, useRef, useState } from 'react'
import type { LottiePlayer } from 'lottie-web'
import Adress from '../../assets/animationAdress.json'

const AnimationAdress = () => {
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
        animationData: Adress
      })
      lottie.setSpeed(1.3)
      return () => animation.destroy()
    }
  }, [lottie])

  return (
    <div className="opacity-70  max-w-xs">
      <div ref={containerLottie} />
    </div>
  )
}

export default AnimationAdress
