import { ReactNode } from 'react'
import { useGlobalContext } from '../contexts/GlobalContext'
import useMedia from '../hooks/useMedia'

interface MainProps {
  children: ReactNode
}

function Main({ children }: MainProps) {
  const { menuActive } = useGlobalContext()

  return (
    <main
      className="container m-auto pt-24"
      style={{
        position: menuActive ? 'relative' : 'static',
        zIndex: menuActive ? '-1' : '1'
      }}
    >
      {children}
    </main>
  )
}

export default Main
