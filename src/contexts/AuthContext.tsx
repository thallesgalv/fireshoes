import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  updateProfile
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



interface AuthContextProps {
  currentUser: User | undefined
  setCurrentUser: (obj: User) => void
  signInWithGoogle: () => void
  register: () => void
  login: () => void
  logout: () => void
  loginDataForm: LoginDataFormProps
  setLoginDataForm: (obj: LoginDataFormProps) => void
  createUserDataForm: CreateUserDataFormProps
  setCreateUserDataForm: (obj: CreateUserDataFormProps) => void
}

interface User {
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
  const [currentUser, setCurrentUser] = useState<User>({} as User)
  const [loginDataForm, setLoginDataForm] = useState({} as LoginDataFormProps)
  const [createUserDataForm, setCreateUserDataForm] = useState(
    {} as CreateUserDataFormProps
  )

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

    return () => unsubscribe()
  }, [])

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)

    if (result.user) {
      const { uid, displayName, photoURL } = result.user
      setCurrentUser({
        id: uid,
        name: displayName,
        photo: photoURL
      })
      toast.success(`${currentUser.name}, você realizou login com sucesso`)
    }
  }

  async function register() {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        createUserDataForm.email,
        createUserDataForm.password
      )

      if (auth.currentUser) {
        updateProfile(auth?.currentUser, {
          displayName: createUserDataForm.name
        })
        setCurrentUser({
          ...currentUser,
          name: auth?.currentUser.displayName
        })
      }

      toast.success(`${currentUser.name}, você criou uma conta com sucesso`)
    } catch (error) {
      toast.error(`Erro ao criar a conta. ${error}`)
      console.log(error)
    }
    setCreateUserDataForm({} as CreateUserDataFormProps)
  }

  async function login() {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        loginDataForm.email,
        loginDataForm.password
      )
      const { uid, displayName, photoURL } = result.user
      setCurrentUser({
        id: uid,
        name: displayName,
        photo: photoURL
      })
      toast.success(`${currentUser.name}, você realizou login com sucesso`)
      Router.push('/')
    } catch (error) {
      toast.error(`Erro ao realizar login. ${error}`)
      console.log(error)
    }
  }

  async function logout() {
    await signOut(auth)
    toast.success('Logoff realizado com sucesso')
    setCurrentUser({} as User)
    Router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        signInWithGoogle,
        register,
        login,
        logout,
        loginDataForm,
        setLoginDataForm,
        createUserDataForm,
        setCreateUserDataForm
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
