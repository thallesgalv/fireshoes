import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth'
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect
} from 'react'
import Router from 'next/router'

import { auth } from '../services/firebase'
import toast from 'react-hot-toast'
import { firebaseErrorHandler } from '../utils/firebaseErrorHandler'
import { User, useUserContext } from './UserContext'

interface AuthContextProps {
  signInWithGoogle: () => void
  signUp: () => void
  login: () => void
  logout: () => void
  forgotPassword: () => void
  loginDataForm: LoginDataFormProps
  setLoginDataForm: (obj: LoginDataFormProps) => void
  recoverUserEmail: string
  setRecoverUserEmail: (str: string) => void
}

interface LoginDataFormProps {
  email: string
  password: string
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { currentUser, setCurrentUser, createUser } = useUserContext()
  const [loginDataForm, setLoginDataForm] = useState({} as LoginDataFormProps)
  const [recoverUserEmail, setRecoverUserEmail] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, photoURL, email, uid } = user

        setCurrentUser({
          name: displayName,
          photo: photoURL,
          email: email,
          uid: uid
        })
      }
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)

    if (result.user) {
      toast.success('Login realizado com sucesso')
      Router.push('/')
    }
  }

  const signUp = async () => {
    try {
      if (currentUser?.email && currentUser?.password) {
        const result = await createUserWithEmailAndPassword(
          auth,
          currentUser?.email,
          currentUser?.password
        )

        if (result.user) {
          setCurrentUser({ ...currentUser, uid: result.user.uid })
        }

        if (auth.currentUser) {
          updateProfile(auth?.currentUser, {
            displayName: currentUser?.name
          })
        }
        createUser()
      }
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
      console.log('ERROR', error)
      console.log('ERROR CODE', error.code)
    }
  }

  const login = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        loginDataForm.email,
        loginDataForm.password
      )
      toast.success('Login realizado com sucesso')
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  const logout = async () => {
    await signOut(auth)
    toast.success('Logout realizado com sucesso')
    setCurrentUser({} as User)
    Router.push('/')
  }

  const forgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, recoverUserEmail)
      toast.success('E-mail enviado com sucesso')
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle,
        signUp,
        login,
        logout,
        forgotPassword,
        loginDataForm,
        setLoginDataForm,
        recoverUserEmail,
        setRecoverUserEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
