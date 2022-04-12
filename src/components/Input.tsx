import {
  InputHTMLAttributes,
  MutableRefObject,
  useCallback,
  useState
} from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import {
  cardNumberMask,
  paymentMethodExpirationDateMask,
  paymentMethodSecurityCodeMask,
  postalCodeMask
} from '../utils/masks'

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
  const [showPassword, setshowPassword] = useState(false)

  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (props.mask === 'postalCodeMask') {
        postalCodeMask(e)
      }
      if (props.mask === 'paymentMethodExpirationDateMask') {
        paymentMethodExpirationDateMask(e)
      }
      if (props.mask === 'paymentMethodSecurityCodeMask') {
        paymentMethodSecurityCodeMask(e)
      }
      if (props.mask === 'cardNumberMask') {
        cardNumberMask(e)
      }
    },
    [props.mask]
  )

  const handleToggleShowPassword = () => {
    setshowPassword(!showPassword)
  }

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
            type={showPassword ? 'text' : props.type || 'text'}
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
          {props.type === 'password' && (
            <button
              onClick={handleToggleShowPassword}
              className="text-lg absolute right-8 opacity-60 z-20"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          )}
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
