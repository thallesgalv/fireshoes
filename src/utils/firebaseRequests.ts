// import {
//   collection,
//   doc,
//   DocumentSnapshot,
//   getDoc,
//   getDocs,
//   limit,
//   orderBy,
//   query,
//   where
// } from 'firebase/firestore'
// import { db } from '../services/firebase'
import { db } from '../../firebase/firestore'
const getFirestore = () => import('../../firebase/firestore')
import { collection, DocumentSnapshot } from 'firebase/firestore'

const productsCollectionRef = collection(db, 'products')

export const getProductsByQuery = async (field?: string, value?: string) => {
  const { query, where, orderBy, limit, getDocs } = await getFirestore()
  try {
    let givenQuery
    if (field && value) {
      givenQuery = query(
        productsCollectionRef,
        where(field, '==', value),
        orderBy('timestamp', 'desc'),
        limit(10)
      )
    } else {
      givenQuery = query(
        productsCollectionRef,
        orderBy('timestamp', 'desc'),
        limit(10)
      )
    }

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

export const getProduct = async (productId: string) => {
  const { doc, getDoc } = await getFirestore()

  const docRef = doc(db, 'products', productId)
  const docSnap = await getDoc(docRef)
  return parseToJson(docSnap)
}
