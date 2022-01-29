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
        w-full md:w-80
      `}
      onClick={onClick}
    >
      {isActive && (
        <p className="absolute top-1 right-1 text-xs uppercase opacity-80">
          Ativo
        </p>
      )}
      {children}
      <ul className="flex text-2xl absolute bottom-2 right-2 cursor-pointer">
        <li onClick={isActive ? handleUpdateButton : undefined}>
          <MdOutlineEdit />
        </li>
        <li onClick={isActive ? handleDeleteButton : undefined}>
          <MdDeleteOutline />
        </li>
      </ul>
    </li>
  )
}

export default CrudCard
