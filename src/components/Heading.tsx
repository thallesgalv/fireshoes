import { primary } from '../utils/colorVariables'

interface HeadingProps {
  text: string
  center?: boolean
  small?: boolean
}

const Heading = ({ text, center, small }: HeadingProps) => {
  return (
    <>
      <h1
        className={`
        ${small ? 'sm:text-3xl text-2xl' : 'sm:text-6xl text-4xl'}
        uppercase text-white font-semibold tracking-wider
        w-max relative my-4
        ${center && 'm-auto'}`}
        style={{
          textShadow: `-1px -1px 0 ${primary}, 1px -1px 0 ${primary}, -1px 1px 0 ${primary}, 1px 1px 0 ${primary}`
        }}
      >
        {text}
        <div className="absolute top-0 text-primary left-1 w-max">{text}</div>
        <hr className="w-100 h-1 bg-primary"></hr>
        <hr className="w-100 h-1  border border-primary"></hr>
      </h1>
    </>
  )
}

export default Heading
