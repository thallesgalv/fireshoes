interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text?: string
  value?: string
  icon?: any
  validationMessage?: string
  widthFull?: boolean
}

function Input({
  text,
  type,
  placeholder,
  required,
  value,
  onChange,
  icon,
  id,
  validationMessage,
  widthFull
}: InputProps) {
  return (
    <>
      <label
        htmlFor={id}
        className="text-primary font-primary font-semibold uppercase text-xs cursor-pointer"
      >
        {text}
        <div className="flex items-center relative">
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            id={id}
            name={id}
            className={`
              font-primary text-primary text-base
              rounded-sm shadow-lg
              p-2
              block border border-primary
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:p-1
              placeholder-text-xs
              ${widthFull && 'w-full'}
            `}
          />
          <span className="text-lg absolute right-2 opacity-60 z-10">
            {icon}
          </span>
        </div>
      </label>
      {validationMessage && (
        <span className="text-primary text-sm relative top-2">
          {validationMessage}
        </span>
      )}
    </>
  )
}

export default Input
