import { MdSearch } from 'react-icons/md'
import { useHeaderContext } from '../../contexts/HeaderContext'
import MiniCartButton from './MiniCartButton'
import UserButton from './UserButton'

const MenuActions = () => {
  const { handleSearchBar } = useHeaderContext()

  return (
    <div className="flex justify-center items-center gap-4">
      <div className="text-primary cursor-pointer" onClick={handleSearchBar}>
        <MdSearch size={30} />
      </div>
      <MiniCartButton />
      <div className="hidden md:block">
        <UserButton />
      </div>
    </div>
  )
}

export default MenuActions
