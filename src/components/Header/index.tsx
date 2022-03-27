import { useHeaderContext } from '../../contexts/HeaderContext'
import Navigation from './Navigation'
import SearchBar from './SearchBar'

const Header = () => {
  const { searchBarActive } = useHeaderContext()

  return (
    <div className="fixed w-full z-30 bg-white">
      <header className={`${!searchBarActive ? 'shadow-lg ' : 'null'} `}>
        <Navigation />
      </header>
      {searchBarActive && <SearchBar />}
    </div>
  )
}

export default Header
