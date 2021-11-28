import Input from '../components/Input'
import Button from '../components/Button'
import {
  MdLogin,
  MdOutlineShoppingCart,
  MdSearch,
  MdMenu,
  MdClose
} from 'react-icons/md'
import Link from 'next/link'
import { useGlobalContext } from '../contexts/GlobalContext'

function Header() {
  const { isMobile, menuActive, setMenuActive } = useGlobalContext()

  function handleMenu() {
    isMobile && setMenuActive(!menuActive)
  }

  return (
    <header className="shadow-lg fixed w-full bg-white">
      <nav
        className="
          container m-auto
          flex justify-between
          py-4
          px-4 2xl:px-0
      "
      >
        <div
          className="lg:hidden text-primary text-4xl cursor-pointer"
          onClick={handleMenu}
        >
          {menuActive ? <MdClose /> : <MdMenu />}
        </div>
        <div className="flex justify-center items-center">
          <Link href="/">
            <a className="text-4xl" onClick={handleMenu}>
              🔥
            </a>
          </Link>

          <ul
            className={`
            ${
              menuActive &&
              'flex absolute z10 top-16 left-0 h-screen w-screen gap-8 flex-col items-center pt-24 text-4xl bg-white'
            }
            ${menuActive || 'hidden'}
            lg:flex gap-4
            lg:ml-12
          text-primary uppercase font-semibold tracking-wide
            `}
          >
            <li>
              <Link href="/">
                <a onClick={handleMenu}>Tênis</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a onClick={handleMenu}>Tênis</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a onClick={handleMenu}>Tênis</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a onClick={handleMenu}>Tênis</a>
              </Link>
            </li>
            <li className="md:hidden">
              <Link href="login">
                <div onClick={handleMenu}>
                  <Button primary text={`Fazer Login`} icon={<MdLogin />} />
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className=" hidden md:block">
            <Input
              placeholder="O que você está procurando?"
              icon={<MdSearch />}
            />
          </div>
          <div className="flex text-primary cursor-pointer">
            <MdOutlineShoppingCart size={40} />
            <span className="rounded-full h-5 w-5 flex justify-center items-center bg-yellow-400 text-sm overflow-hidden">
              99
            </span>
          </div>
          <div className="hidden md:block">
            <Link href="login">
              <div>
                <Button primary text={`Fazer Login`} icon={<MdLogin />} />
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
