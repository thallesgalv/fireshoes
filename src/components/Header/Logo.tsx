import Link from 'next/link'
import { useHeaderContext } from '../../contexts/HeaderContext'
import AnimationFire from '../Lottie/AnimationFire'

const Logo = () => {
  const { setMenuActive } = useHeaderContext()

  return (
    <Link href="/">
      <a className="text-4xl" onClick={() => setMenuActive(false)}>
        <AnimationFire />
      </a>
    </Link>
  )
}

export default Logo
