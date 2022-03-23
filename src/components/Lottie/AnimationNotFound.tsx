import type { LottiePlayer } from 'lottie-web'
import { useEffect, useRef, useState } from 'react'
import NotFound from '../../assets/animationNotFound.json'

const AnimationNotFound = () => {
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
        animationData: NotFound
      })
      lottie.setSpeed(0.8)
      return () => animation.destroy()
    }
  }, [lottie])

  return (
    <div className="w-48">
      <div ref={containerLottie} />
    </div>
  )
}

export default AnimationNotFound
