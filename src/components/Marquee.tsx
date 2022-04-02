interface MarqueeProps {
  list: string[]
}

const Marquee = ({ list }: MarqueeProps) => {
  const twMarqueeItem = "m-4 text-white uppercase truncate"
  return (
    <div className="flex whitespace-no-wrap overflow-x-hidden bg-red-500">
      <div className="relative">
        <ul className="flex animate-marquee">
          {list.map((item, key) => {
            return (
              <li key={key} className={twMarqueeItem}>
                {item}
              </li>
            )
          })}
        </ul>
        <ul className="flex absolute top-0 animate-marquee2">
          {list.map((item, key) => {
            return (
              <li key={key} className={twMarqueeItem}>
                {item}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Marquee
