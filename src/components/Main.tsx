import { ReactNode } from 'react'
import { useGlobalContext } from '../contexts/GlobalContext'

interface MainProps {
  children: ReactNode
}

const Main = ({ children }: MainProps) => {
  const { menuActive } = useGlobalContext()

  return (
    <main
      className="container m-auto pt-24 pb-8"
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
