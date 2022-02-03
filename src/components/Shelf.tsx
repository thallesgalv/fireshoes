import { useRef } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { Product } from '../contexts/ProductContext'
import Heading from './Heading'
import ShelfItem from './ShelfItem'
import { useGlobalContext } from '../contexts/GlobalContext'

interface ShelfProps {
  data?: Product[]
  title?: string
  titleCenter?: boolean
}

const Shelf = ({ data, title, titleCenter }: ShelfProps) => {
  const { isMobile } = useGlobalContext()

  const carousel = useRef<HTMLUListElement>(null)

  const handleNextSlide = () => {
    if (carousel.current) {
      carousel.current.scrollLeft += carousel.current.offsetWidth / 5
    }
  }

  const handlePreviousSlide = () => {
    if (carousel.current) {
      carousel.current.scrollLeft -= carousel.current.offsetWidth / 5
    }
  }

  if (!data || data.length === 0) return null

  return (
    <section className="relative">
      {title && <Heading text={title} small center={titleCenter || isMobile} />}
      <div className="">
        <ul
          className={`
            flex gap-7
            py-8 px-1
            overflow-x-auto scroll-smooth no-scrollbar
          `}
          ref={carousel}
        >
          {data.map(({ id, name, price, bestPrice, images, mainImg }, idx) => (
            <li key={idx}>
              <ShelfItem
                id={id}
                name={name}
                price={price}
                bestPrice={bestPrice}
                images={images}
                mainImg={mainImg}
              />
            </li>
          ))}
        </ul>
      </div>
      {!isMobile && (
        <ul className="absolute top-1/2 w-full flex justify-between items-center">
          <li className="text-primary cursor-pointer relative">
            <MdChevronLeft
              onClick={handlePreviousSlide}
              size={40}
              className="absolute lg:-left-10 xl:-left-16"
            />
          </li>
          <li className="text-primary cursor-pointer relative">
            <MdChevronRight
              onClick={handleNextSlide}
              size={40}
              className="absolute lg:-right-10 xl:-right-16"
            />
          </li>
        </ul>
      )}
    </section>
  )
}

export default Shelf
