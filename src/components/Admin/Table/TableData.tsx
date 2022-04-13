import { ReactNode } from 'react'

interface TableDataProps {
  children: ReactNode
}

const TableData = ({ children }: TableDataProps) => {
  return (
    <th className="border border-primary p-2 text-center text-dark">
      {children}
    </th>
  )
}

export default TableData
