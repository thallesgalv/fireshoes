import Link from 'next/link'
import { useRef } from 'react'
import { MdClose } from 'react-icons/md'
import { useGlobalContext } from '../contexts/GlobalContext'
import Button from './Button'
import Cart from './Cart'
import Heading from './Heading'

const MiniCart = () => {
  const { miniCartActive, setMiniCartActive } = useGlobalContext()
  const miniCartContainer = useRef(null)

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === miniCartContainer.current) setMiniCartActive(false)
  }

  if (!miniCartActive) return null

  return (
    <section
      className=" w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-10 flex justify-end"
      ref={miniCartContainer}
      onClick={handleClick}
    >
      <div className="w-fit bg-white p-2 lg:p-6 rounded animate-in">
        <div className="flex items-center justify-around">
          <div
            className="text-primary text-4xl cursor-pointer"
            onClick={() => {
              setMiniCartActive(false)
            }}
          >
            <MdClose />
          </div>
          <Heading text="Meu carrinho" center small />
        </div>

        <Cart heightScreen>
          <ul className="flex flex-col gap-4 w-2/3 mx-auto mt-auto mb-40 lg:mb-32">
            <li>
              <Link href="/checkout">
                <a>
                  <Button primary text="Finalizar compra" widthFull />
                </a>
              </Link>
            </li>
            <li>
              <Button
                secondary
                text="Continuar comprando"
                widthFull
                onClick={() => setMiniCartActive(false)}
              />
            </li>
          </ul>
        </Cart>
      </div>
    </section>
  )
}

export default MiniCart
