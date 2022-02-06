import Image from 'next/image'
import { FaGoogle } from 'react-icons/fa'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string | null
  primary?: boolean
  secondary?: boolean
  icon?: any
  google?: boolean
  widthFull?: boolean
  userPhoto?: string | null
}

const Button = ({
  text,
  primary,
  secondary,
  onClick,
  onMouseOver,
  onMouseLeave,
  disabled,
  icon,
  google,
  widthFull,
  userPhoto
}: ButtonProps) => {
  return (
    <button
      className={`
        ${primary && 'bg-primary border-1 border-primary text-white'}
        ${secondary && 'bg-transparent text-primary'}
        ${disabled && 'pointer-events-none opacity-50'}
        ${
          (icon || google || userPhoto) &&
          'flex justify-center items-center gap-1'
        }
        ${widthFull && 'w-full'}
        ring-2 ring-primary border-transparent
        font-semibold text-xs font-primary uppercase
        rounded-sm shadow-lg
        p-2 h8
      `}
      disabled={disabled}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {google && <FaGoogle />}
      {userPhoto && (
        <Image
          height={20}
          width={20}
          src={userPhoto}
          alt="Foto do usuário"
          className="rounded-full object-cover"
        />
      )}
      {text}
      <div className="text-lg">{icon}</div>
    </button>
  )
}

export default Button
