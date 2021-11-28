interface HeadingProps {
  text: string
  center?: boolean
}

function Heading({ text, center }: HeadingProps) {
  return (
    <>
      <h1
        className={`
        uppercase text-white font-semibold tracking-wider
        sm:text-6xl text-5xl
        w-max relative my-4
        ${center && 'm-auto'}`}
        style={{
          textShadow:
            '-1px -1px 0 #F63C3C, 1px -1px 0 #F63c3c, -1px 1px 0 #f63c3c, 1px 1px 0 #f63c3c'
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
