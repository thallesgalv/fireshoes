import { primary } from '../utils/colorVariables'

interface HeadingProps {
  text: string
  center?: boolean
  small?: boolean
  inverse?: boolean
}

const Heading = ({ text, center, small, inverse }: HeadingProps) => {
  return (
    <>
      <h1
        className={`
        ${small ? 'sm:text-3xl text-2xl' : 'sm:text-6xl text-4xl'}
        ${inverse ? 'text-primary' : 'text-white'}
        uppercase font-semibold tracking-wider
        w-max relative my-4
        ${center && 'm-auto'}`}
        style={{
          textShadow: `-1px -1px 0 ${inverse ? 'white' : primary}, 1px -1px 0 ${
            inverse ? 'white' : primary
          }, -1px 1px 0 ${inverse ? 'white' : primary}, 1px 1px 0 ${
            inverse ? 'white' : primary
          }`
        }}
      >
        {text}
        <div
          className={`absolute top-0 ${
            inverse ? 'text-white' : 'text-primary'
          } left-1 w-max`}
        >
          {text}
        </div>
        {!inverse && (
          <>
            <hr className="w-100 h-1 bg-primary"></hr>
            <hr className="w-100 h-1  border border-primary"></hr>
          </>
        )}
      </h1>
    </>
  )
}

export default Heading
