import { brandRoutes, categoryRoutes } from '../../../routes'
import { useGlobalContext } from '../../contexts/GlobalContext'
import { useHeaderContext } from '../../contexts/HeaderContext'
import DropdownLinks from './DropdownLinks'

const Dropdown = () => {
  const { dropdownSelected, dropdownActive } = useHeaderContext()
  const { isMobile } = useGlobalContext()

  if (!dropdownActive || isMobile) return null
  return (
    <div className="bg-primary shadow-lg p-4">
      <ul className="lg:flex gap-4 justify-center items-center max-w-screen-xl m-auto text-primary uppercase font-semibold tracking-wide">
        {dropdownSelected === 'category' && (
          <DropdownLinks routeArray={categoryRoutes} />
        )}
        {dropdownSelected === 'brand' && (
          <DropdownLinks routeArray={brandRoutes} />
        )}
      </ul>
    </div>
  )
}

export default Dropdown
