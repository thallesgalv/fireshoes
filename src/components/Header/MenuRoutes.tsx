import Link from 'next/link'
import { useHeaderContext } from '../../contexts/HeaderContext'
import UserButton from './UserButton'

const MenuRoutes = () => {
  const { menuActive, handleMenu } = useHeaderContext()

  return (
    <ul
      className={`
        lg:flex gap-4 lg:ml-12 text-primary uppercase font-semibold tracking-wide
        ${
          menuActive
            ? 'flex absolute z10 top-16 left-0 h-screen w-screen gap-8 flex-col items-center pt-24 text-4xl bg-white animate-show'
            : 'hidden'
        }
      `}
    >
      <li>
        <Link href="/category/Nike">
          <a onClick={handleMenu}>Nike</a>
        </Link>
      </li>
      <li>
        <Link href="/category/Adidas">
          <a onClick={handleMenu}>Adidas</a>
        </Link>
      </li>
      <li>
        <Link href="/category/Asics">
          <a onClick={handleMenu}>Asics</a>
        </Link>
      </li>
      <li>
        <Link href="/products">
          <a onClick={handleMenu}>Produtos</a>
        </Link>
      </li>
      <li className="md:hidden">
        <UserButton />
      </li>
    </ul>
  )
}

export default MenuRoutes
