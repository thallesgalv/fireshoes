interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text?: string
  value?: string
  icon?: any
  validationMessage?: string
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
  validationMessage
}: InputProps) {
  return (
    <>
      <label
        htmlFor={id}
        className="text-primary font-primary font-semibold uppercase text-xs cursor-pointer"
      >
        {text}
        <div className="flex items-center">
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            id={id}
            className="
        font-primary text-primary text-base
        rounded-sm shadow-lg
        p-2
        block
        focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:p-1
        placeholder-text-xs
        "
          />
          <span className="text-lg relative right-6 opacity-60">{icon}</span>
        </div>
      </label>
      <span className="text-primary text-sm relative top-2">
        {validationMessage}
      </span>
    </>
  )
}

export default Input
