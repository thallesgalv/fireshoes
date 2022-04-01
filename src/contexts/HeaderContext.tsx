import { createContext, ReactNode, useContext, useState } from 'react'
import { useGlobalContext } from './GlobalContext'

interface HeaderContextProviderProps {
  children: ReactNode
}

interface HeaderContextProps {
  menuActive: boolean
  setMenuActive: (state: boolean) => void
  searchBarActive: boolean
  setSearchBarActive: (state: boolean) => void
  searchTerm: string
  setSearchTerm: (state: string) => void
  handleMenu: () => void
  handleSearchBar: () => void
  dropdownActive: boolean
  setDropdownActive: (state: boolean) => void
  dropdownSelected: DropdownSelected
  setDropdownSelected: (state: DropdownSelected) => void
}

type DropdownSelected = 'category' | 'brand' | null

const HeaderContext = createContext({} as HeaderContextProps)

export const HeaderContextProvider = ({
  children
}: HeaderContextProviderProps) => {
  const [menuActive, setMenuActive] = useState(false)
  const [searchBarActive, setSearchBarActive] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [dropdownActive, setDropdownActive] = useState(false)
  const [dropdownSelected, setDropdownSelected] =
    useState<DropdownSelected>(null)

  const { isMobile } = useGlobalContext()

  const handleMenu = () => {
    isMobile && setMenuActive(!menuActive)
    setSearchBarActive(false)
  }

  const handleSearchBar = () => {
    setSearchBarActive(!searchBarActive)
    setMenuActive(false)
  }

  return (
    <HeaderContext.Provider
      value={{
        menuActive,
        setMenuActive,
        searchBarActive,
        setSearchBarActive,
        handleMenu,
        handleSearchBar,
        searchTerm,
        setSearchTerm,
        dropdownActive,
        setDropdownActive,
        dropdownSelected,
        setDropdownSelected
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}

export const useHeaderContext = () => useContext(HeaderContext)
