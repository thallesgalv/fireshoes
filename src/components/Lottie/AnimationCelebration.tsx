import lottie from 'lottie-web'
import { useEffect, useRef } from 'react'

import Celebration from '../../assets/animationCelebration.json'

const AnimationCelebration = () => {
  const containerLottie = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerLottie.current) {
      lottie.loadAnimation({
        container: containerLottie.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: Celebration
      })
    }
    lottie.setSpeed(0.8)
  }, [])

  return (
    <div className="w-3/4 m-auto">
      <div ref={containerLottie} />
    </div>
  )
}

export default AnimationCelebration
