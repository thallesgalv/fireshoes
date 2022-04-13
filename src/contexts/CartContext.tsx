import { doc, Timestamp } from 'firebase/firestore'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import toast from 'react-hot-toast'
import { firebaseErrorHandler } from '../firebase/firebaseErrorHandler'
import { db } from '../firebase/firestore'
import { Cart, ProductInCart } from '../types/interfaces'
import { useGlobalContext } from './GlobalContext'
import { useUserContext } from './UserContext'
const getFirestore = () => import('../firebase/firestore')

interface CartContextProps {
  currentCart: Cart
  cartTotalValue: number
  savingValue: number
  selectedSize: string
  setSelectedSize: (size: string) => void
  addToCart: (product: ProductInCart) => void
  removeFromCart: (product: ProductInCart) => void
  incrementQuantity: (productId: string, selectedSize: string) => void
  decrementQuantity: (productId: string, selectedSize: string) => void
  emptyCart: () => void
  setOrder: () => void
}

interface CartContextProviderProps {
  children: ReactNode
}
export const CartContext = createContext({} as CartContextProps)

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [currentCart, setCurrentCart] = useState({} as Cart)
  const [cartTotalValue, setCartTotalValue] = useState(0)
  const [savingValue, setSavingValue] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')

  const { currentUser } = useUserContext()
  const { setSucessOrder } = useGlobalContext()

  const currentUserRef = doc(db, 'users', currentUser?.uid || 'noUid')

  useEffect(() => {
    getCart()
  }, [])

  useEffect(() => {
    setCart()
  }, [currentCart])

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
    localStorage.setItem(
      'fireshoescart',
      JSON.stringify({
        currentCart
      })
    )
  }

  const addToCart = (product: ProductInCart) => {
    if (
      product.id &&
      !checkIfProductIsInCart(product.id, product.selectedSize)
    ) {
      if (product.selectedSize) {
        setCurrentCart({
          products: currentCart.products
            ? [...currentCart.products, product]
            : [product]
        })
        toast.success('Produto adicionado ao carrinho.')
      } else {
        toast.error('Por favor, selecione um tamanho.')
      }
    } else {
      toast.error('Este produto já está no carrinho.')
    }
  }

  const removeFromCart = (product: ProductInCart) => {
    if (
      product.id &&
      checkIfProductIsInCart(product.id, product.selectedSize)
    ) {
      const query = currentCart.products.find(
        (p) => p.id === product.id && p.selectedSize === product.selectedSize
      )
      setCurrentCart({
        products: currentCart.products.filter((p) => p !== query)
      })

      toast.success('Produto removido do carrinho.')
    }
  }

  const checkIfProductIsInCart = (productId: string, selectedSize: string) => {
    return currentCart?.products?.some(
      (p) => p.id === productId && p.selectedSize === selectedSize
    )
  }

  const incrementQuantity = (productId: string, selectedSize: string) => {
    handleQuantity(productId, selectedSize, 'increment')
  }

  const decrementQuantity = (productId: string, selectedSize: string) => {
    handleQuantity(productId, selectedSize, 'decrement')
  }

  const emptyCart = () => {
    localStorage.removeItem('fireshoescart')
    setCurrentCart({} as Cart)
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
    selectedSize: string,
    operation: 'increment' | 'decrement'
  ) => {
    if (checkIfProductIsInCart(productId, selectedSize)) {
      const modified = currentCart.products.map((p) => {
        if (p.id === productId && p.selectedSize === selectedSize) {
          if (operation === 'increment') {
            if (p.quantity < 10) {
              p.quantity++
              toast.success('Produto adicionado ao carrinho.')
            } else {
              toast.error('Quantidade máxima de itens de um produto atingida.')
            }
          }

          if (operation === 'decrement') {
            if (p.quantity > 1) {
              p.quantity--
              toast.success('Produto removido do carrinho.')
            } else {
              toast.error('Para remover um item do carrinho clique na lixeira.')
            }
          }
        }
        return p
      })

      setCurrentCart({ products: modified })
    }
  }

  const setOrder = async () => {
    const { updateDoc, arrayUnion } = await getFirestore()

    try {
      if (currentCart.products && cartTotalValue) {
        await updateDoc(currentUserRef, {
          orders: arrayUnion({
            products: currentCart?.products,
            totalValue: cartTotalValue,
            adress:
              currentUser?.adressList &&
              typeof currentUser.selectedAdress === 'number' &&
              currentUser?.adressList[currentUser.selectedAdress],
            paymentMethod:
              currentUser?.paymentMethodList &&
              typeof currentUser.selectedPaymentMethod === 'number' &&
              currentUser?.paymentMethodList[currentUser.selectedPaymentMethod],
            timestamp: Timestamp.now()
          })
        })
        toast.success(`Compra realizada com sucesso.`)
        emptyCart()
        setSucessOrder(true)
      } else {
        toast.error(`Erro na compra.`)
      }
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
      console.error(error)
      console.error(error.code)
    }
  }

  return (
    <CartContext.Provider
      value={{
        currentCart,
        cartTotalValue,
        savingValue,
        selectedSize,
        setSelectedSize,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        emptyCart,
        setOrder
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  return useContext(CartContext)
}
