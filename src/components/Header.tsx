import Link from 'next/link'
import { useEffect, useRef } from 'react'
import {
  MdClose,
  MdLogin,
  MdMenu,
  MdOutlineShoppingCart,
  MdPerson,
  MdSearch
} from 'react-icons/md'
import Button from '../components/Button'
import Input from '../components/Input'
import { useCartContext } from '../contexts/CartContext'
import { useGlobalContext } from '../contexts/GlobalContext'
import { useUserContext } from '../contexts/UserContext'
import { auth } from '../firebase/auth'
import AnimationFire from './Lottie/AnimationFire'

const Header = () => {
  const { isMobile, menuActive, setMenuActive, setMiniCartActive } =
    useGlobalContext()
  const { currentUser } = useUserContext()
  const { currentCart } = useCartContext()
  const cartNumber = useRef<HTMLSpanElement>(null)

  const handleMenu = () => {
    isMobile && setMenuActive(!menuActive)
  }

  const handleMiniCart = () => {
    setMiniCartActive(true)
  }

  useEffect(() => {
    if (cartNumber.current) {
      cartNumber.current.classList.add('animate-bounce')
    }
    const animation = setTimeout(() => {
      if (cartNumber.current) {
        cartNumber.current.classList.remove('animate-bounce')
      }
    }, 3500)

    return () => {
      clearTimeout(animation)
    }
  }, [currentCart])

  return (
    <header className="shadow-lg fixed w-full bg-white z-20">
      <nav
        className="
          max-w-screen-xl m-auto
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
            <a className="text-4xl" onClick={() => setMenuActive(false)}>
              {/* 🔥 */}
              <AnimationFire />
            </a>
          </Link>

          <ul
            className={`
            ${
              menuActive &&
              'flex absolute z10 top-16 left-0 h-screen w-screen gap-8 flex-col items-center pt-24 text-4xl bg-white animate-show'
            }
            ${menuActive || 'hidden'}
            lg:flex gap-4
            lg:ml-12
          text-primary uppercase font-semibold tracking-wide
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
              <Link
                href={
                  auth.currentUser && auth.currentUser?.uid ? '/user' : '/login'
                }
              >
                <div onClick={handleMenu}>
                  {auth.currentUser && auth.currentUser?.uid ? (
                    <Button
                      primary
                      text={currentUser?.name}
                      icon={!currentUser?.photo && <MdPerson />}
                      userPhoto={currentUser?.photo}
                    />
                  ) : (
                    <Button primary text={`Fazer Login`} icon={<MdLogin />} />
                  )}
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className=" hidden md:block">
            <Input
              placeholder="O que você está procurando?"
              type="search"
              icon={<MdSearch />}
            />
          </div>
          <div
            className="flex text-primary relative cursor-pointer"
            onClick={handleMiniCart}
          >
            <MdOutlineShoppingCart size={40} />
            <span
              className="rounded-full h-5 w-5 flex justify-center items-center bg-yellow-400 text-xs font-semibold overflow-hidden absolute -right-1 -top-1"
              ref={cartNumber}
            >
              {currentCart.products?.length || 0}
            </span>
          </div>
          <div className="hidden md:block">
            <Link
              href={
                auth.currentUser && auth.currentUser?.uid ? '/user' : '/login'
              }
            >
              <div>
                {auth.currentUser && auth.currentUser?.uid ? (
                  <Button
                    primary
                    text={currentUser?.name}
                    icon={!currentUser?.photo && <MdPerson />}
                    userPhoto={currentUser?.photo}
                  />
                ) : (
                  <Button primary text={`Fazer Login`} icon={<MdLogin />} />
                )}
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
