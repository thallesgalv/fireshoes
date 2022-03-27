import { useEffect, useRef } from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { useCartContext } from '../../contexts/CartContext'
import { useGlobalContext } from '../../contexts/GlobalContext'
import { useHeaderContext } from '../../contexts/HeaderContext'

const MiniCartButton = () => {
  const { currentCart } = useCartContext()
  const { setMiniCartActive } = useGlobalContext()
  const {setSearchBarActive} = useHeaderContext()

  const cartNumber = useRef<HTMLSpanElement>(null)

  const handleMiniCart = () => {
    setMiniCartActive(true)
    setSearchBarActive(false)
  }

  useEffect(() => {
    if (cartNumber.current) {
      cartNumber.current.classList.add('animate-bounce')
    }
    const animation = setTimeout(() => {
      if (cartNumber.current) {
        cartNumber.current.classList.remove('animate-bounce')
      }
    }, 3500)

    return () => {
      clearTimeout(animation)
    }
  }, [currentCart])

  return (
    <div
      className="flex text-primary relative cursor-pointer"
      onClick={handleMiniCart}
    >
      <MdOutlineShoppingCart size={30} />
      <span
        className="rounded-full h-4 w-4 flex justify-center items-center bg-yellow-400 text-xs font-semibold overflow-hidden absolute -right-1 -top-1"
        ref={cartNumber}
      >
        {currentCart.products?.length || 0}
      </span>
    </div>
  )
}

export default MiniCartButton
