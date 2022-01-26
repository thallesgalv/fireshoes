import { createContext, useContext, useState, ReactNode } from 'react'
import useMedia from '../hooks/useMedia'

interface GlobalContextProps {
  isMobile: boolean
  menuActive: boolean
  setMenuActive: (bool: boolean) => void
  miniCartActive: boolean
  setMiniCartActive: (bool: boolean) => void
}

interface GlobalContextProviderProps {
  children: ReactNode
}

export const GlobalContext = createContext({} as GlobalContextProps)

export const GlobalContextProvider = ({
  children
}: GlobalContextProviderProps) => {
  const isMobile = useMedia('(max-width: 768px)')
  const [menuActive, setMenuActive] = useState(false)
  const [miniCartActive, setMiniCartActive] = useState(false)

  return (
    <GlobalContext.Provider
      value={{
        isMobile,
        menuActive,
        setMenuActive,
        miniCartActive,
        setMiniCartActive
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
