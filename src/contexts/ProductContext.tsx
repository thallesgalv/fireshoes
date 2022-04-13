import { collection } from 'firebase/firestore'
import { createContext, ReactNode, useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { firebaseErrorHandler } from '../firebase/firebaseErrorHandler'
import { db } from '../firebase/firestore'
import { Product } from '../types/interfaces'
const getFirestore = () => import('../firebase/firestore')

interface ProductContextProps {
  currentProducts?: Product[]
  setCurrentProducts: (arg?: Product[]) => void
  getProductsByClient: () => void
}

interface ProductContextProviderProps {
  children: ReactNode
}

export const ProductContext = createContext({} as ProductContextProps)

export const ProductContextProvider = ({
  children
}: ProductContextProviderProps) => {
  const [currentProducts, setCurrentProducts] = useState<Product[]>()

  const productsCollectionRef = collection(db, 'products')

  const getProductsByClient = async () => {
    const { query, orderBy, getDocs } = await getFirestore()

    try {
      const queryOrderByReleaseDate = query(
        productsCollectionRef,
        orderBy('timestamp', 'desc')
      )
      const querySnapshot = await getDocs(queryOrderByReleaseDate)

      setCurrentProducts(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
      console.error(error)
    }
  }

  return (
    <ProductContext.Provider
      value={{
        currentProducts,
        setCurrentProducts,
        getProductsByClient
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => {
  return useContext(ProductContext)
}
