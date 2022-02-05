import { TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  text?: string
  widthFull?: boolean
  htmlFor?: string
}

const TextArea = (props: TextAreaProps) => {
  return (
    <>
      <label
        htmlFor={props.htmlFor}
        className="text-primary font-primary font-semibold uppercase text-xs cursor-pointer"
      >
        {props.text}
        <div className="flex items-center relative">
          <textarea
            autoComplete="off"
            name={props.name}
            id={props.htmlFor}
            onChange={props.onChange}
            required={props.required}
            value={props.value}
            className={`
              font-primary text-primary text-base
              rounded-sm shadow-lg
              p-2
              block border border-primary
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              resize-none
              ${props.widthFull && 'w-full'}
              md:h-48
            `}
          />
        </div>
      </label>
    </>
  )
}

export default TextArea
