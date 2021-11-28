import { createContext, useContext, useState, ReactNode } from 'react'
import useMedia from '../hooks/useMedia'

interface GlobalContextProps {
  isMobile: boolean
  menuActive: boolean
  setMenuActive: (bool: boolean) => void
}

interface GlobalCOntextProviderProps {
  children: ReactNode
}

export const GlobalContext = createContext({} as GlobalContextProps)

export function GlobalContextProvider({
  children
}: GlobalCOntextProviderProps) {
  const isMobile = useMedia('(max-width: 768px)')
  const [menuActive, setMenuActive] = useState(false)

  return (
    <GlobalContext.Provider value={{ isMobile, menuActive, setMenuActive }}>
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobalContext() {
  return useContext(GlobalContext)
}
