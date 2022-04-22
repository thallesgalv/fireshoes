import { ReactNode } from 'react'

interface MainProps {
  children: ReactNode
}

const Main = ({ children }: MainProps) => {
  return (
    <main className="max-w-screen-xl m-auto pt-32 pb-8 font-primary">
      {children}
    </main>
  )
}

export default Main
