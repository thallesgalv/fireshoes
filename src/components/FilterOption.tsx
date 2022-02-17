import { MouseEventHandler } from 'react'

interface FilterOptionProps {
  text?: string 
  active?: boolean
  hidden?: boolean
  onClick?: MouseEventHandler<HTMLDivElement> | undefined
}

const FilterOption = ({ text, active, hidden, onClick }: FilterOptionProps) => {
  return (
    <div
      className={`
        text-sm font-primary text-ellipsis whitespace-nowrap overflow-hidden
        border border-primary
        w-fit max-w-[10rem] rounded-sm p-1 cursor-pointer
        ${active ? 'bg-primary text-white' : 'text-primary'}
        ${hidden ? 'hidden' : 'block'}
      `}
      onClick={onClick}
    >
      {text}
    </div>
  )
}

export default FilterOption
