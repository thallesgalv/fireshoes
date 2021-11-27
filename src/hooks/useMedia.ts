import { useState, useEffect } from 'react'

function useMedia(param: string) {
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    function checkForMobile() {
      setIsMobile(window.matchMedia(param).matches)
    }

    checkForMobile()

    window.addEventListener('resize', checkForMobile)

    return () => window.removeEventListener('resize', checkForMobile)
  }, [])

  return isMobile
}

export default useMedia
