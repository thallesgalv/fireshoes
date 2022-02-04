import lottie from 'lottie-web'
import { useEffect, useRef } from 'react'

import Fire from '../../assets/animationFire.json'

const AnimationFire = () => {
  const containerLottie = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerLottie.current) {
      lottie.loadAnimation({
        container: containerLottie.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: Fire
      })
    }
    lottie.setSpeed(0.8)
  }, [])

  return (
    <div className="w-10 h-10">
      <div ref={containerLottie} />
    </div>
  )
}

export default AnimationFire
