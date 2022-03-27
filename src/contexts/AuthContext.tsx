import { createContext, ReactNode, useContext, useEffect } from 'react'
import { auth, onAuthStateChanged } from '../firebase/auth'
import { useUserContext } from './UserContext'

interface AuthContextProps {}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { currentUser, setCurrentUser, getUser } = useUserContext()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, photoURL, email, uid } = user

        getUser()

        setCurrentUser({
          ...currentUser,
          name: displayName,
          photo: photoURL,
          email: email,
          uid: uid
        })
      }
    })

    return () => unsubscribe()
  }, [])

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
