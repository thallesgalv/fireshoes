import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import toast from 'react-hot-toast'
import { Product } from './ProductContext'

export interface ProductInCart extends Product {
  quantity: number
}

export interface Cart {
  products: ProductInCart[]
  totalValue?: number
}

interface CartContextProps {
  currentCart: Cart
  cartTotalValue: number
  savingValue: number
  addToCart: (product: ProductInCart) => void
  removeFromCart: (product: ProductInCart) => void
  incrementQuantity: (productId: string) => void
  decrementQuantity: (productId: string) => void
}

interface CartContextProviderProps {
  children: ReactNode
}
export const CartContext = createContext({} as CartContextProps)

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [currentCart, setCurrentCart] = useState({} as Cart)
  const [cartTotalValue, setCartTotalValue] = useState(0)
  const [savingValue, setSavingValue] = useState(0)

  useEffect(() => {
    getCart()
  }, [])

  useEffect(() => {
    setCart()
  }, [currentCart.products])

  useEffect(() => {
    const unsubscribe = getTotalValue()
    return unsubscribe
  }, [currentCart.products])

  const getCart = () => {
    const storage = localStorage.getItem('fireshoescart')
    if (storage) {
      setCurrentCart(JSON.parse(storage).currentCart)
    }
  }

  const setCart = () => {
    if (currentCart.products?.length) {
      localStorage.setItem(
        'fireshoescart',
        JSON.stringify({
          currentCart
        })
      )
    }
  }

  const addToCart = (product: ProductInCart) => {
    if (product.id && !checkIfProductIsInCart(product.id)) {
      setCurrentCart({
        products: currentCart.products
          ? [...currentCart.products, product]
          : [product]
      })

      toast.success('Produto adicionado ao carrinho.')
    } else {
      toast.error('Este produto já está no carrinho.')
      console.log(product)
    }
  }

  const removeFromCart = (product: ProductInCart) => {
    if (product.id && checkIfProductIsInCart(product.id)) {
      setCurrentCart({
        products: currentCart.products.filter((p) => p.id !== product.id)
      })

      toast.success('Produto removido do carrinho.')
    }
  }

  const checkIfProductIsInCart = (productId: string) => {
    return currentCart?.products?.some((p) => p.id === productId)
  }

  const incrementQuantity = (productId: string) => {
    handleQuantity(productId, 'increment')
  }

  const decrementQuantity = (productId: string) => {
    handleQuantity(productId, 'decrement')
  }

  function getTotalValue() {
    let totalValue = 0
    let totalSaving = 0
    currentCart.products?.forEach(({ price, bestPrice, quantity }) => {
      if (bestPrice && price && bestPrice < price) {
        totalValue += bestPrice * quantity
        totalSaving += (price - bestPrice) * quantity
      }
      if ((!bestPrice && price) || (bestPrice && price && price <= bestPrice)) {
        totalValue += price * quantity
      }
    })

    setCartTotalValue(totalValue)
    setSavingValue(totalSaving)
  }

  const handleQuantity = (
    productId: string,
    operation: 'increment' | 'decrement'
  ) => {
    if (checkIfProductIsInCart(productId)) {
      const modified = currentCart.products.map((p) => {
        if (p.id === productId) {
          if (operation === 'increment') p.quantity++
          if (operation === 'decrement') p.quantity--
        }
        return p
      })

      setCurrentCart({ products: modified })
    }
  }

  return (
    <CartContext.Provider
      value={{
        currentCart,
        cartTotalValue,
        savingValue,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  return useContext(CartContext)
}
