import { getAuth } from 'firebase/auth'
import { app } from '../firebase/app'

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
