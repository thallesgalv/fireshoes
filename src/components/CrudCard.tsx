import { ReactNode } from 'react'
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md'

interface CrudCardProps {
  children: ReactNode
  isActive?: boolean
}

const CrudCard = ({ children, isActive }: CrudCardProps) => {
  return (
    <li
      className={`
        ${!isActive && 'opacity-50 cursor-pointer'}
        border-2 border-primary rounded-sm list-none p-8
        flex flex-col
        font-primary text-primary font-semibold
        shadow-lg relative
      `}
    >
      {children}
      <ul className="flex text-2xl absolute bottom-2 right-2 cursor-pointer">
        <li>
          <MdOutlineEdit />
        </li>
        <li>
          <MdDeleteOutline />
        </li>
      </ul>
    </li>
  )
}

export default CrudCard
