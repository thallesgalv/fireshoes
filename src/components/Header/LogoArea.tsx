import Link from 'next/link'
import { useHeaderContext } from '../../contexts/HeaderContext'
import Logo from '../Logo'

const LogoArea = () => {
  const { setMenuActive } = useHeaderContext()

  return (
    <Link href="/">
      <a onClick={() => setMenuActive(false)}>
        <Logo height={36} width={180} fill="#F63C3C"/>
      </a>
    </Link>
  )
}

export default LogoArea
