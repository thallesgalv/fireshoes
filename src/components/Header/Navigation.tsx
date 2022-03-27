import { MdClose, MdMenu } from 'react-icons/md'
import { useHeaderContext } from '../../contexts/HeaderContext'
import Logo from './Logo'
import MenuActions from './MenuActions'
import MenuRoutes from './MenuRoutes'

const Navigation = () => {
  const { menuActive, handleMenu } = useHeaderContext()

  return (
    <nav className="max-w-screen-xl m-auto flex justify-between py-4 px-4 2xl:px-0">
      <div
        className="lg:hidden text-primary text-4xl cursor-pointer"
        onClick={handleMenu}
      >
        {menuActive ? <MdClose /> : <MdMenu />}
      </div>

      <div className="flex justify-center items-center">
        <Logo />
        <MenuRoutes />
      </div>
      <MenuActions />
    </nav>
  )
}

export default Navigation
