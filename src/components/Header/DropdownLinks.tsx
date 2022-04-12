import Link from 'next/link'
import { useHeaderContext } from '../../contexts/HeaderContext'

interface DropdownLinksProps {
  routeArray: Route[]
}

interface Route {
  title: string
  path: string
}

const DropdownLinks = ({ routeArray }: DropdownLinksProps) => {
  const { handleMenu } = useHeaderContext()

  if (routeArray.length === 0) return null
  return (
    <ul className="flex flex-col lg:flex-row gap-4 lg:gap-4 justify-center max-w-screen-xl m-auto text-primary lg:text-white uppercase font-semibold tracking-wide animate-show">
      {routeArray.map(({ path, title }, index) => (
        <li key={index}>
          <Link href={path}>
            <a onClick={handleMenu}>{title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default DropdownLinks
