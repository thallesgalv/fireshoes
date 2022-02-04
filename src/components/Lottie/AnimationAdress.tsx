import lottie from 'lottie-web'
import { useEffect, useRef } from 'react'
import Adress from '../../assets/animationAdress.json'

const AnimationAdress = () => {
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
    <div className="opacity-70  max-w-xs">
      <div ref={containerLottie} />
    </div>
  )
}

export default AnimationAdress
