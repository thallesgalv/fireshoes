import { doc } from 'firebase/firestore'
import { createContext, ReactNode, useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { auth } from '../firebase/auth'
import { firebaseErrorHandler } from '../firebase/firebaseErrorHandler'
import { db } from '../firebase/firestore'
import { User } from '../types/interfaces'
const getFirestore = () => import('../firebase/firestore')

interface UserContextProps {
  currentUser?: User
  setCurrentUser: (arg?: User) => void
  getUser: () => void
}

interface UserContextProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextProps)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User>()

  const getUser = async () => {
    const { onSnapshot } = await getFirestore()

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
            orders: data?.orders,
            isAdmin: data?.isAdmin
          })
        })
      }
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        getUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
