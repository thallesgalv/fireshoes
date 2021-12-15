import { MouseEventHandler, ReactNode } from 'react'
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md'

interface CrudCardProps {
  children: ReactNode
  isActive?: boolean
  onClick?: MouseEventHandler<HTMLLIElement> | undefined
  handleDeleteButton?: MouseEventHandler<HTMLLIElement> | undefined
  handleUpdateButton?: MouseEventHandler<HTMLLIElement> | undefined
}

const CrudCard = ({
  children,
  isActive,
  onClick,
  handleDeleteButton,
  handleUpdateButton
}: CrudCardProps) => {
  return (
    <li
      className={`
        ${!isActive && 'opacity-50 cursor-pointer'}
        border-2 border-primary rounded-sm list-none p-8
        flex flex-col
        font-primary text-primary font-semibold
        shadow-lg relative
      `}
      onClick={onClick}
    >
      {children}
      <ul className="flex text-2xl absolute bottom-2 right-2 cursor-pointer">
        <li onClick={handleUpdateButton}>
          <MdOutlineEdit />
        </li>
        <li onClick={handleDeleteButton}>
          <MdDeleteOutline />
        </li>
      </ul>
    </li>
  )
}

export default CrudCard
