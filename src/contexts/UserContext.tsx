import { setDoc, doc, collection } from 'firebase/firestore'
import { createContext, useContext, useState, ReactNode } from 'react'
import toast from 'react-hot-toast'
import { auth, db } from '../services/firebase'

export interface User {
  name?: string | undefined | null
  photo?: string | undefined | null
  email?: string | undefined | null
  password?: string | undefined
}

interface UserContextProps {
  currentUser: User | undefined
  setCurrentUser: (param: User | undefined) => void
  createUser: () => void
}

interface UserContextProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextProps)

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [currentUser, setCurrentUser] = useState<User>()
  const usersCollectionRef = collection(db, 'users')

  async function createUser() {
    if (auth.currentUser) {
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        name: currentUser?.name,
        email: currentUser?.email,
      })

      toast.success(`Conta criada com sucesso`)
    }
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, createUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
