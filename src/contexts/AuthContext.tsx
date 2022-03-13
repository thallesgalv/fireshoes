import { useRouter } from 'next/router'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import toast from 'react-hot-toast'
import { auth, onAuthStateChanged } from '../firebase/auth'
import { firebaseErrorHandler } from '../firebase/firebaseErrorHandler'
import { db } from '../firebase/firestore'
import { User, useUserContext } from './UserContext'
const getFirestore = () => import('../firebase/firestore')
const getFirebase = () => import('../firebase/auth')

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
  const { currentUser, setCurrentUser, createUser, getUser } = useUserContext()
  const [loginDataForm, setLoginDataForm] = useState({} as LoginDataFormProps)
  const [recoverUserEmail, setRecoverUserEmail] = useState('')
  const router = useRouter()

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
