import Link from 'next/link'
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md'
import { brandRoutes, categoryRoutes } from '../../../routes'
import { useGlobalContext } from '../../contexts/GlobalContext'
import { useHeaderContext } from '../../contexts/HeaderContext'
import DropdownLinks from './DropdownLinks'
import UserButton from './UserButton'

const MenuRoutes = () => {
  const {
    menuActive,
    handleMenu,
    dropdownActive,
    setDropdownActive,
    dropdownSelected,
    setDropdownSelected
  } = useHeaderContext()

  const { isMobile } = useGlobalContext()

  const handleCategory = () => {
    setDropdownActive(true)
    setDropdownSelected('category')
  }

  const handleBrand = () => {
    setDropdownActive(true)
    setDropdownSelected('brand')
  }

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
        <Link href="/products">
          <a
            onClick={handleMenu}
            className="bg-primary p-1 text-white rounded-sm px-2"
          >
            Produtos
          </a>
        </Link>
      </li>

      <li
        className="cursor-pointer"
        onMouseEnter={handleCategory}
        onClick={() => {
          isMobile && handleCategory()
        }}
      >
        <div className="flex items-center">
          <p
            className={`${
              dropdownSelected === 'category' && !isMobile ? 'underline' : ''
            }`}
          >
            Categorias
          </p>
          <div>
            {dropdownSelected === 'category' ? (
              <MdOutlineArrowDropUp />
            ) : (
              <MdOutlineArrowDropDown />
            )}
          </div>
        </div>
        {dropdownActive && isMobile && (
          <div className="text-lg text-center mt-4 max-h-32 overflow-scroll">
            {dropdownSelected === 'category' && (
              <DropdownLinks routeArray={categoryRoutes} />
            )}
          </div>
        )}
      </li>
      <li
        className="cursor-pointer"
        onMouseEnter={handleBrand}
        onClick={() => {
          isMobile && handleBrand()
        }}
      >
        <div className="flex items-center">
          <p
            className={` ${
              dropdownSelected === 'brand' && !isMobile ? 'underline' : ''
            }`}
          >
            Marcas
          </p>
          <div>
            {dropdownSelected === 'brand' ? (
              <MdOutlineArrowDropUp />
            ) : (
              <MdOutlineArrowDropDown />
            )}
          </div>
        </div>
        {dropdownActive && isMobile && (
          <div className="text-lg text-center mt-4 max-h-48 overflow-scroll">
            {dropdownSelected === 'brand' && (
              <DropdownLinks routeArray={brandRoutes} />
            )}
          </div>
        )}
      </li>
      <li className="md:hidden">
        <UserButton />
      </li>
    </ul>
  )
}

export default MenuRoutes
