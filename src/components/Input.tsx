import { InputHTMLAttributes, MutableRefObject, useCallback } from 'react'
import { postalCodeMask } from '../utils/masks'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  text?: string
  icon?: any
  validationMessage?: string
  widthFull?: boolean
  htmlFor?: string
  mask?: string
  reference?: MutableRefObject<HTMLInputElement | null>
  textareaLike?: boolean
}

const Input = (props: InputProps) => {
  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (props.mask === 'postalCodeMask') {
        postalCodeMask(e)
      }
    },
    [props.mask]
  )

  return (
    <>
      <label
        htmlFor={props.htmlFor}
        className="text-primary font-primary font-semibold uppercase text-xs cursor-pointer"
      >
        {props.text}
        <div className="flex items-center relative">
          <input
            autoComplete="off"
            type={props.type || 'text'}
            name={props.name}
            id={props.htmlFor}
            onChange={props.onChange}
            onKeyUp={handleKeyUp}
            onBlur={props.onBlur}
            placeholder={props.placeholder}
            required={props.required}
            defaultValue={props.value}
            maxLength={props.maxLength}
            ref={props.reference}
            accept={props.accept}
            className={`
              font-primary text-primary text-base
              rounded-sm shadow-lg
              p-2
              block border border-primary
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              placeholder-text-xs
              ${props.widthFull && 'w-full'}
            `}
          />
          <span className="text-lg absolute right-2 opacity-60 z-20">
            {props.icon}
          </span>
        </div>
      </label>
      {props.validationMessage && (
        <span className="text-primary text-sm relative top-2">
          {props.validationMessage}
        </span>
      )}
    </>
  )
}

export default Input
