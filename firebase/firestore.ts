import { getFirestore } from 'firebase/firestore'
import { app } from '../firebase/app'

export {
  doc,
  getDoc,
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  setDoc,
  arrayRemove,
} from 'firebase/firestore'

export const db = getFirestore(app)
