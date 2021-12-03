import { useState } from 'react'

interface UserOptionProps {
  text: string
  isActive?: boolean
  value: string
  radio: string
  setRadio: (value: string) => void
}

function UserOption({ text, value, radio, setRadio }: UserOptionProps) {
  return (
    <label
      htmlFor={value}
      className={`
        font-primary text-lg font-semibold
        ${radio === value ? 'text-primary' : 'cursor-pointer text-gray-400'}
      `}
    >
      {text}
      <input
        type="radio"
        value={value}
        name={value}
        id={value}
        checked={radio === value}
        onChange={({ target }) => setRadio(target.value)}
        className="hidden"
      />
    </label>
  )
}

export default UserOption
