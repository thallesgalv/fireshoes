import { useRouter } from 'next/router'
import {
  createContext,
  FormEvent,
  ReactNode,
  useCallback,
  useContext,
  useState
} from 'react'
import toast from 'react-hot-toast'
import { ModalStatus } from '../components/Modal'
import { auth } from '../firebase/auth'
import { firebaseErrorHandler } from '../firebase/firebaseErrorHandler'
import { db } from '../firebase/firestore'
import { User, useUserContext } from './UserContext'
const getFirestore = () => import('../firebase/firestore')
const getFirebase = () => import('../firebase/auth')

interface LoginContextProviderProps {
  children: ReactNode
}

interface LoginDataFormProps {
  email: string
  password: string
}

interface LoginContextProps {
  loginDataForm: LoginDataFormProps
  setLoginDataForm: (obj: LoginDataFormProps) => void
  recoverUserEmail: string
  setRecoverUserEmail: (str: string) => void
  modalStatus: ModalStatus
  setModalStatus: (status: ModalStatus) => void
  handleLoginInput: (e: FormEvent<HTMLInputElement>) => void
  handleCreateUserInput: (e: FormEvent<HTMLInputElement>) => void
  signInWithGoogle: () => void
  signUp: () => void
  login: () => void
  logout: () => void
  forgotPassword: () => void
}

const LoginContext = createContext({} as LoginContextProps)

export const LoginContextProvider = ({
  children
}: LoginContextProviderProps) => {
  const [loginDataForm, setLoginDataForm] = useState({} as LoginDataFormProps)
  const [recoverUserEmail, setRecoverUserEmail] = useState('')
  const [modalStatus, setModalStatus] = useState<ModalStatus>(null)

  const { currentUser, setCurrentUser, createUser } = useUserContext()
  const router = useRouter()

  const handleLoginInput = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setLoginDataForm({
        ...loginDataForm,
        [e.currentTarget.name]: e.currentTarget.value
      })
    },
    [loginDataForm]
  )

  const handleCreateUserInput = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setCurrentUser({
        ...currentUser,
        [e.currentTarget.name]: e.currentTarget.value
      })
    },
    [currentUser]
  )

  const signInWithGoogle = async () => {
    const { GoogleAuthProvider, signInWithPopup } = await getFirebase()

    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const { doc, getDoc } = await getFirestore()

      if (result.user) {
        toast.success('Login realizado com sucesso')
        router.push('/')
        const currentUserRef = doc(db, 'users', result.user.uid)
        const currentUserSnap = await getDoc(currentUserRef)
        if (!currentUserSnap.exists()) createUser()
      }
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  const signUp = async () => {
    const { createUserWithEmailAndPassword, updateProfile } =
      await getFirebase()

    if (currentUser?.password === currentUser?.passwordConfirmed) {
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
      }
    } else {
      toast.error('As senhas não conferem')
    }
  }

  const login = async () => {
    const { signInWithEmailAndPassword } = await getFirebase()

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
    const { signOut } = await getFirebase()

    await signOut(auth)
    toast.success('Logout realizado com sucesso')
    setCurrentUser({} as User)
    router.push('/')
  }

  const forgotPassword = async () => {
    const { sendPasswordResetEmail } = await getFirebase()

    try {
      await sendPasswordResetEmail(auth, recoverUserEmail)
      toast.success('E-mail enviado com sucesso')
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  return (
    <LoginContext.Provider
      value={{
        handleLoginInput,
        modalStatus,
        setModalStatus,
        handleCreateUserInput,
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
    </LoginContext.Provider>
  )
}

export const useLoginContext = () => useContext(LoginContext)
