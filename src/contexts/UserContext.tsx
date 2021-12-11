import { setDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore'
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
  paymentMethod?: PaymentMethod
}

export interface Adress {
  postalCode?: string
  street?: string
  number?: string
  complement?: string
  neighborhood?: string
  city?: string
  state?: string
  active?: boolean
}

interface PaymentMethod {
  alias?: string
  cardNumber?: string
  expirationDate?: string
  securityCode?: string
  cardHolder?: string
  active?: boolean
}

interface UserContextProps {
  currentUser: User | undefined
  setCurrentUser: (param: User | undefined) => void
  createUser: () => void
  setAdress: () => void
}

interface UserContextProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextProps)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User>()
  const currentUserRef = doc(db, 'users', currentUser?.uid || '')

  const createUser = async () => {
    if (auth.currentUser) {
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        name: currentUser?.name,
        email: currentUser?.email,
        adress: []
      })

      toast.success(`Conta criada com sucesso`)
    }
  }

  const setAdress = async () => {
    if (auth.currentUser) {
      await updateDoc(currentUserRef, {
        adress: arrayUnion(currentUser?.adress)
      })

      toast.success(`Endereço atualizado com sucesso`)
    }
  }

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, createUser, setAdress }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
