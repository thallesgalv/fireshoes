import { ReactNode } from 'react'

interface MainProps {
  children: ReactNode
}

function Main({ children }: MainProps) {
  return <main className="container m-auto pt-24 ">{children}</main>
}

export default Main
