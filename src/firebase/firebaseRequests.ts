import { collection, DocumentSnapshot } from 'firebase/firestore'
import { db } from './firestore'
const getFirestore = () => import('./firestore')

const productsCollectionRef = collection(db, 'products')

export const getProductsByQuery = async (
  queryType: 'where' | 'array',
  field?: string,
  value?: string
) => {
  const { query, where, orderBy, limit, getDocs } = await getFirestore()
  try {
    let givenQuery

    if (queryType === 'where') {
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
    }
    if (queryType === 'array') {
      if (field && value) {
        givenQuery = query(
          productsCollectionRef,
          where(field, 'array-contains', value),
          orderBy('timestamp', 'desc'),
          limit(10)
        )
      }
    }

    if (givenQuery) {
      const querySnapshot = await getDocs(givenQuery)
      return querySnapshot.docs.map(parseToJson)
    }
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

export const getProductsByServer = async () => {
  const { query, orderBy, getDocs } = await getFirestore()

  try {
    const queryOrderByReleaseDate = query(
      productsCollectionRef,
      orderBy('timestamp', 'desc')
    )

    if (queryOrderByReleaseDate) {
      const querySnapshot = await getDocs(queryOrderByReleaseDate)
      return querySnapshot.docs.map(parseToJson)
    }
  } catch (error: any) {
    console.error(error)
  }
}

export const getProductByServer = async (productId: string) => {
  const { doc, getDoc } = await getFirestore()

  const docRef = doc(db, 'products', productId)
  const docSnap = await getDoc(docRef)
  return parseToJson(docSnap)
}
