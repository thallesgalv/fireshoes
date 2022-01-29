import {
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  arrayRemove,
  Timestamp
} from 'firebase/firestore'
import { createContext, useContext, useState, ReactNode } from 'react'
import toast from 'react-hot-toast'
import { auth, db } from '../services/firebase'
import { firebaseErrorHandler } from '../utils/firebaseErrorHandler'
import { ProductInCart, useCartContext } from './CartContext'
import { useGlobalContext } from './GlobalContext'

export interface User {
  uid?: string
  name?: string | undefined | null
  photo?: string | undefined | null
  email?: string | undefined | null
  password?: string | undefined
  adressList?: Adress[]
  selectedAdress?: number
  paymentMethodList?: PaymentMethod[]
  selectedPaymentMethod?: number
  orders?: Order[]
}

export interface Adress {
  postalCode?: string
  street?: string
  number?: string
  complement?: string
  neighborhood?: string
  city?: string
  state?: string
}

export interface PaymentMethod {
  alias?: string
  cardNumber?: string
  expirationDate?: string
  securityCode?: string
  cardHolder?: string
}

export interface Order {
  products: ProductInCart[]
  totalValue: number
  adress?: Adress
  adressList?: Adress[]
  selectedAdress?: number
  paymentMethod?: PaymentMethod
  paymentMethodList?: PaymentMethod[]
  selectedPaymentMethod?: number
  timestamp?: Timestamp
}

interface UserContextProps {
  currentUser?: User
  setCurrentUser: (arg?: User) => void
  createUser: () => void
  getUser: () => void
  adressDataForm: Adress
  setAdressDataForm: (obj: Adress) => void
  setActiveAdress: (arg: number) => void
  setAdress: () => void
  deleteAdress: (arg: number) => void
  updateAdress: (arg: number) => void
  paymentMethodDataForm: PaymentMethod
  setPaymentMethodDataForm: (obj: PaymentMethod) => void
  setActivePaymentMethod: (arg: number) => void
  setPaymentMethod: () => void
  deletePaymentMethod: (arg: number) => void
  updatePaymentMethod: (arg: number) => void
  setOrder: () => void
}

interface UserContextProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextProps)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User>()
  const [adressDataForm, setAdressDataForm] = useState({} as Adress)
  const [paymentMethodDataForm, setPaymentMethodDataForm] = useState(
    {} as PaymentMethod
  )
  const currentUserRef = doc(db, 'users', currentUser?.uid || 'noUid')

  const { currentCart, cartTotalValue, emptyCart } = useCartContext()
  const { setSucessOrder } = useGlobalContext()

  const createUser = async () => {
    if (auth.currentUser) {
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        name: currentUser?.name || auth.currentUser.displayName,
        email: currentUser?.email || auth.currentUser.email,
        photo: auth.currentUser.photoURL || '',
        adressList: [],
        paymentMethodList: [],
        orders: []
      })

      toast.success(`Conta criada com sucesso`)
    }
  }

  const getUser = async () => {
    try {
      if (auth.currentUser) {
        onSnapshot(doc(db, 'users', auth.currentUser.uid), (doc) => {
          const data = doc.data() as User
          setCurrentUser({
            ...currentUser,
            uid: auth?.currentUser?.uid,
            name: data?.name,
            email: data?.email,
            photo: data?.photo,
            adressList: data?.adressList,
            selectedAdress: data?.selectedAdress,
            paymentMethodList: data?.paymentMethodList,
            selectedPaymentMethod: data?.selectedPaymentMethod,
            orders: data?.orders
          })
        })
      }
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  const setActiveAdress = async (arg: number) => {
    try {
      await updateDoc(currentUserRef, {
        selectedAdress: arg
      })
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  const setAdress = async () => {
    try {
      if (currentUser?.adressList && currentUser.adressList.length < 3) {
        await updateDoc(currentUserRef, {
          adressList: arrayUnion(adressDataForm),
          selectedAdress: currentUser?.adressList?.length || 0
        })
        toast.success(`Endereço cadastrado com sucesso`)
      } else {
        toast.error(`Você só pode possuir até três endereços cadastrados.`)
      }
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  const deleteAdress = async (arg: number) => {
    try {
      await updateDoc(currentUserRef, {
        adressList: arrayRemove(currentUser?.adressList?.[arg])
      })
      toast.success(`Endereço removido com sucesso`)
      currentUser?.adressList &&
        setActiveAdress(currentUser?.adressList.length - 2)
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  const updateAdress = async (arg: number) => {
    try {
      await updateDoc(currentUserRef, {
        adressList: arrayRemove(currentUser?.adressList?.[arg])
      })

      await updateDoc(currentUserRef, {
        adressList: arrayUnion(adressDataForm)
      })

      currentUser?.adressList &&
        setActiveAdress(currentUser?.adressList.length - 1)
      toast.success(`Endereço atualizado com sucesso`)
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  const setActivePaymentMethod = async (arg: number) => {
    try {
      await updateDoc(currentUserRef, {
        selectedPaymentMethod: arg
      })
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  const setPaymentMethod = async () => {
    try {
      if (
        currentUser?.paymentMethodList &&
        currentUser.paymentMethodList.length < 3
      ) {
        await updateDoc(currentUserRef, {
          paymentMethodList: arrayUnion(paymentMethodDataForm),
          selectedPaymentMethod: currentUser?.paymentMethodList?.length || 0
        })
        toast.success(`Meio de pagamento cadastrado com sucesso`)
      } else {
        toast.error(
          `Você só pode possuir até três meios de pagamento cadastrados.`
        )
      }
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  const deletePaymentMethod = async (arg: number) => {
    try {
      await updateDoc(currentUserRef, {
        paymentMethodList: arrayRemove(currentUser?.paymentMethodList?.[arg])
      })
      toast.success(`Meio de pagamento removido com sucesso`)
      currentUser?.paymentMethodList &&
        setActivePaymentMethod(currentUser?.paymentMethodList.length - 2)
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  const updatePaymentMethod = async (arg: number) => {
    try {
      await updateDoc(currentUserRef, {
        paymentMethodList: arrayRemove(currentUser?.paymentMethodList?.[arg])
      })

      await updateDoc(currentUserRef, {
        paymentMethodList: arrayUnion(paymentMethodDataForm)
      })

      currentUser?.paymentMethodList &&
        setActivePaymentMethod(currentUser?.paymentMethodList.length - 1)
      toast.success(`Meio de pagamento atualizado com sucesso`)
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  const setOrder = async () => {
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
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        createUser,
        getUser,
        adressDataForm,
        setAdressDataForm,
        setActiveAdress,
        setAdress,
        deleteAdress,
        updateAdress,
        paymentMethodDataForm,
        setPaymentMethodDataForm,
        setActivePaymentMethod,
        setPaymentMethod,
        deletePaymentMethod,
        updatePaymentMethod,
        setOrder
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
