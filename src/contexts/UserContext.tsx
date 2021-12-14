import {
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot
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
  adress?: Adress
  adressList?: Adress[]
  paymentMethod?: PaymentMethod
  selectedAdress?: number
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

interface PaymentMethod {
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
  setAdress: () => void
  getUser: () => void
  setActiveAdress: (arg: number) => void
}

interface UserContextProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextProps)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User>()
  const currentUserRef = doc(db, 'users', currentUser?.uid || 'noUid')

  const createUser = async () => {
    if (auth.currentUser) {
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        name: currentUser?.name,
        email: currentUser?.email,
      })

      toast.success(`Conta criada com sucesso`)
    }
  }

  const getUser = async () => {
    if (auth.currentUser) {
      onSnapshot(doc(db, 'users', auth.currentUser.uid), (doc) => {
        const data = doc.data() as User
        const { name, email, adressList, selectedAdress } = data
        setCurrentUser({
          ...currentUser,
          uid: auth?.currentUser?.uid,
          name: name,
          email: email,
          adressList: adressList,
          selectedAdress: selectedAdress
        })
      })
    }
  }

  const setAdress = async () => {
    if (auth.currentUser) {
      await updateDoc(currentUserRef, {
        adressList: arrayUnion(currentUser?.adress),
        selectedAdress: currentUser?.adressList?.length || 0
      })

      toast.success(`Endereço atualizado com sucesso`)
    }
  }

  const setActiveAdress = async (arg: number) => {
    await updateDoc(currentUserRef, {
      selectedAdress: arg
    })
    toast.success(`Endereço primário atualizado com sucesso`)
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        createUser,
        setAdress,
        getUser,
        setActiveAdress
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
