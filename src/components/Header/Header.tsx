import { useGlobalContext } from '../../contexts/GlobalContext'
import { useHeaderContext } from '../../contexts/HeaderContext'
import Dropdown from './Dropdown'
import Navigation from './Navigation'
import SearchBar from './SearchBar'

const Header = () => {
  const {
    searchBarActive,
    dropdownActive,
    setDropdownActive,
    setDropdownSelected
  } = useHeaderContext()

  const { isMobile } = useGlobalContext()

  const handleMouseLeave = () => {
    if (!isMobile) {
      setDropdownActive(false)
      setDropdownSelected(null)
    }
  }

  return (
    <div className="fixed w-full z-30 bg-white" onMouseLeave={handleMouseLeave}>
      <header
        className={`
          ${!searchBarActive || dropdownActive ? 'shadow-lg ' : null}
        `}
      >
        <Navigation />
      </header>
      {dropdownActive && <Dropdown />}
      {searchBarActive && <SearchBar />}
    </div>
  )
}

export default Header
