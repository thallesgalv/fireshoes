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

interface AuthContextProps {
  currentUser: User | undefined
  setCurrentUser: (obj: User) => void
  signInWithGoogle: () => void
  signUp: () => void
  login: () => void
  logout: () => void
  forgotPassword: () => void
  loginDataForm: LoginDataFormProps
  setLoginDataForm: (obj: LoginDataFormProps) => void
  createUserDataForm: CreateUserDataFormProps
  setCreateUserDataForm: (obj: CreateUserDataFormProps) => void
  recoverUserEmail: string
  setRecoverUserEmail: (str: string) => void
}

export interface User {
  id: string
  name: string | null
  photo: string | null
}

interface LoginDataFormProps {
  email: string
  password: string
}

interface CreateUserDataFormProps {
  name: string
  email: string
  cpf: string
  birthDate: string
  password: string
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [currentUser, setCurrentUser] = useState({} as User)
  const [loginDataForm, setLoginDataForm] = useState({} as LoginDataFormProps)
  const [createUserDataForm, setCreateUserDataForm] = useState(
    {} as CreateUserDataFormProps
  )
  const [recoverUserEmail, setRecoverUserEmail] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, photoURL } = user
        setCurrentUser({
          id: uid,
          name: displayName,
          photo: photoURL
        })
      }
    })

    return unsubscribe()
  }, [])

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)

    if (result.user) {
      toast.success('Login realizado com sucesso')
      Router.push('/')
    }
  }

  async function signUp() {
    try {
      await createUserWithEmailAndPassword(
        auth,
        createUserDataForm.email,
        createUserDataForm.password
      )

      if (auth.currentUser) {
        updateProfile(auth?.currentUser, {
          displayName: createUserDataForm.name
        })
      }

      toast.success(`Conta criada com sucesso`)
      setCreateUserDataForm({} as CreateUserDataFormProps)
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  async function login() {
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

  async function logout() {
    await signOut(auth)
    toast.success('Logoff realizado com sucesso')
    setCurrentUser({} as User)
    Router.push('/')
  }

  async function forgotPassword() {
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
        currentUser,
        setCurrentUser,
        signInWithGoogle,
        signUp,
        login,
        logout,
        forgotPassword,
        loginDataForm,
        setLoginDataForm,
        createUserDataForm,
        setCreateUserDataForm,
        recoverUserEmail,
        setRecoverUserEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
