import { getAuth } from 'firebase/auth'
import { app } from './app'

export {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth'

export const auth = getAuth(app)
