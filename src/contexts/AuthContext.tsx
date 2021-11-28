import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  getAuth
} from 'firebase/auth'
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect
} from 'react'

import { app } from '../services/firebase'

const auth = getAuth(app)

interface AuthContextProps {
  user: User | undefined
  signInWithGoogle: () => void
}

interface User {
  id: string
  name: string | null
  photo: string | null
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>()

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)

    if (result.user) {
      const { uid, displayName, photoURL } = result.user
      setUser({
        id: uid,
        name: displayName,
        photo: photoURL
      })
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, photoURL } = user
        setUser({
          id: uid,
          name: displayName,
          photo: photoURL
        })
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
