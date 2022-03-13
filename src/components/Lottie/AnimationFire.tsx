import type { LottiePlayer } from 'lottie-web'
import { useEffect, useRef, useState } from 'react'
import Fire from '../../assets/animationFire.json'

const AnimationFire = () => {
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
        animationData: Fire
      })
      lottie.setSpeed(0.8)
      return () => animation.destroy()
    }
  }, [lottie])

  return (
    <div className="w-10 h-10">
      <div ref={containerLottie} />
    </div>
  )
}

export default AnimationFire
