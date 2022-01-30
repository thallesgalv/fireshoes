import {
  collection,
  DocumentSnapshot,
  getDocs,
  limit,
  orderBy,
  query,
  where
} from 'firebase/firestore'
import { db } from '../services/firebase'

export const getProductsByQuery = async (field: string, value: string) => {
  const productsCollectionRef = collection(db, 'products')
  try {
    const givenQuery = query(
      productsCollectionRef,
      where(field, '==', value),
      orderBy('timestamp', 'desc'),
      limit(10)
    )

    const querySnapshot = await getDocs(givenQuery)
    return querySnapshot.docs.map(parseToJson)
  } catch (error: any) {
    console.error(error)
  }
}

export const parseToJson = (doc: DocumentSnapshot) => {
  const data = doc.data()
  return {
    ...data,
    id: doc.id,
    timestamp: data?.timestamp.toMillis() || 0
  }
}
