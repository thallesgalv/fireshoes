import {
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  arrayRemove
} from 'firebase/firestore'
import { createContext, useContext, useState, ReactNode } from 'react'
import toast from 'react-hot-toast'
import { auth, db } from '../services/firebase'

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

interface UserContextProps {
  currentUser: User | undefined
  setCurrentUser: (param: User | undefined) => void
  createUser: () => void
  getUser: () => void
  adressDataForm: Adress
  setAdressDataForm: (obj: Adress) => void
  setAdress: () => void
  deleteAdress: (arg: number) => void
  setActiveAdress: (arg: number) => void
  paymentMethodDataForm: PaymentMethod
  setPaymentMethodDataForm: (obj: PaymentMethod) => void
  setPaymentMethod: () => void
  deletePaymentMethod: (arg: number) => void
  setActivePaymentMethod: (arg: number) => void
}

interface UserContextProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextProps)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [adressDataForm, setAdressDataForm] = useState({} as Adress)
  const [paymentMethodDataForm, setPaymentMethodDataForm] = useState(
    {} as PaymentMethod
  )
  const [currentUser, setCurrentUser] = useState<User>()
  const currentUserRef = doc(db, 'users', currentUser?.uid || 'noUid')

  const createUser = async () => {
    if (auth.currentUser) {
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        name: currentUser?.name,
        email: currentUser?.email
      })

      toast.success(`Conta criada com sucesso`)
    }
  }

  const getUser = async () => {
    if (auth.currentUser) {
      onSnapshot(doc(db, 'users', auth.currentUser.uid), (doc) => {
        const data = doc.data() as User
        setCurrentUser({
          ...currentUser,
          uid: auth?.currentUser?.uid,
          name: data?.name,
          email: data?.email,
          adressList: data?.adressList,
          selectedAdress: data?.selectedAdress,
          paymentMethodList: data?.paymentMethodList,
          selectedPaymentMethod: data?.selectedPaymentMethod
        })
      })
    }
  }

  const setAdress = async () => {
    if (auth.currentUser) {
      const newSelectAdress = currentUser?.adressList?.length

      await updateDoc(currentUserRef, {
        adressList: arrayUnion(adressDataForm),
        // selectedAdress: newSelectAdress ? newSelectAdress - 1 : 0
        selectedAdress: newSelectAdress || 0
      })

      toast.success(`Endereço atualizado com sucesso`)
    }
  }

  const deleteAdress = async (arg: number) => {
    if (auth.currentUser) {
      const newSelectAdress = currentUser?.adressList?.length

      await updateDoc(currentUserRef, {
        adressList: arrayRemove(currentUser?.adressList?.[arg]),
        selectedAdress: newSelectAdress ? newSelectAdress - 1 : 0
      })

      toast.success(`Endereço removido com sucesso`)
    }
  }

  const setActiveAdress = async (arg: number) => {
    if (auth.currentUser) {
      await updateDoc(currentUserRef, {
        selectedAdress: arg
      })
    }
  }

  const setPaymentMethod = async () => {
    if (auth.currentUser) {
      const newSelectPaymentMethod = currentUser?.paymentMethodList?.length

      await updateDoc(currentUserRef, {
        paymentMethodList: arrayUnion(paymentMethodDataForm),
        selectedPaymentMethod: newSelectPaymentMethod
          ? newSelectPaymentMethod - 1
          : 0
      })

      toast.success(`Meio de pagamento atualizado com sucesso`)
    }
  }

  const deletePaymentMethod = async (arg: number) => {
    if (auth.currentUser) {
      const newSelectPaymentMethod = currentUser?.paymentMethodList?.length

      await updateDoc(currentUserRef, {
        paymentMethodList: arrayRemove(currentUser?.paymentMethodList?.[arg]),
        selectedPaymentMethod: newSelectPaymentMethod
          ? newSelectPaymentMethod - 1
          : 0
      })

      toast.success(`Meio de pagamento removido com sucesso`)
    }
  }

  const setActivePaymentMethod = async (arg: number) => {
    if (auth.currentUser) {
      await updateDoc(currentUserRef, {
        selectedPaymentMethod: arg
      })
    }
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        createUser,
        setAdress,
        getUser,
        setActiveAdress,
        deleteAdress,
        adressDataForm,
        setAdressDataForm,
        paymentMethodDataForm,
        setPaymentMethodDataForm,
        setPaymentMethod,
        deletePaymentMethod,
        setActivePaymentMethod
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
