import { FaGoogle } from 'react-icons/fa'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  primary?: boolean
  secondary?: boolean
  icon?: any
  google?: boolean
  widthFull?: boolean
  userPhoto?: string | null
}

function Button({
  text,
  primary,
  secondary,
  onClick,
  disabled,
  icon,
  google,
  widthFull,
  userPhoto
}: ButtonProps) {
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
        p-2
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {google && <FaGoogle />}
      {userPhoto && (
        <img
          src={userPhoto}
          alt="Foto do usuário"
          className="rounded-full h-8 w-8"
        />
      )}
      {text}
      <div className="text-lg">{icon}</div>
    </button>
  )
}

export default Button
