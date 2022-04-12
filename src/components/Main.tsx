import { ReactNode } from 'react'

interface MainProps {
  children: ReactNode
}

const Main = ({ children }: MainProps) => {
  // const { menuActive } = useGlobalContext()

  return (
    <main
      className="max-w-screen-xl m-auto pt-32 pb-8 font-primary"
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
