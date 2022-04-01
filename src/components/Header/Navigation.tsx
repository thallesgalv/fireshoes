import { MdClose, MdMenu } from 'react-icons/md'
import { useHeaderContext } from '../../contexts/HeaderContext'
import LogoArea from './LogoArea'
import MenuActions from './MenuActions'
import MenuRoutes from './MenuRoutes'

const Navigation = () => {
  const { menuActive, handleMenu } = useHeaderContext()

  return (
    <nav className="max-w-screen-xl m-auto flex justify-between items-center py-4 px-4 2xl:px-0">
      <div
        className="lg:hidden text-primary text-4xl cursor-pointer flex-1"
        onClick={handleMenu}
      >
        {menuActive ? <MdClose /> : <MdMenu />}
      </div>

      <div className="flex justify-center items-center flex-1 lg:flex-none mr-3 lg:mr-0">
        <LogoArea />
        <MenuRoutes />
      </div>
      <div className="flex-1 lg:flex-none">
      <MenuActions />
      </div>
    </nav>
  )
}

export default Navigation
