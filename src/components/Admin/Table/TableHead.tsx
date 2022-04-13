import { ReactNode } from "react"

interface TableHeadProps {
  children: ReactNode
}

const TableHead = ({children}: TableHeadProps) => {
  return <th className="text-center p-2 border border-white">{children}</th>
}

export default TableHead
