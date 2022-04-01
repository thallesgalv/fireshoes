import { ReactNode } from 'react'

interface MainProps {
  children: ReactNode
}

const Main = ({ children }: MainProps) => {
  // const { menuActive } = useGlobalContext()

  return (
    <main
      className="max-w-screen-xl m-auto pt-28 pb-8"
      // style={{
      //   position: menuActive ? 'relative' : 'static',
      //   zIndex: menuActive ? '-1' : '1'
      // }}
    >
      {children}
    </main>
  )
}

export default Main
