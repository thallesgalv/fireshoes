import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  MutableRefObject
} from 'react'
import toast from 'react-hot-toast'
import { auth, db, storage } from '../services/firebase'
import { firebaseErrorHandler } from '../utils/firebaseErrorHandler'

export interface Product {
  id?: string
  name?: string
  brand?: string
  price?: number
  bestPrice?: number
  images?: String[]
  mainImg?: string
  description?: string
  timestamp?: string
}

interface ProductContextProps {
  currentProducts?: Product[]
  setCurrentProducts: (arg?: Product[]) => void
  currentProduct?: Product
  setCurrentProduct: (arg: Product | undefined) => void
  getProducts: () => void
  getProduct: (productId: string) => void
  getProductOnTime: (productId: string) => void
  createProduct: () => void
  productDataForm: Product
  setProductDataForm: (obj: Product) => void
  uploadFile: (productId: string) => void
  inputFileRef: MutableRefObject<HTMLInputElement | null>
  handleChangeMainImg: (newImage: string) => void
  updateProduct: () => void
  deleteProduct: () => void
  getProductsByQuery: (field: string, value: string) => Promise<Product[] | undefined>
}

interface ProductContextProviderProps {
  children: ReactNode
}

export const ProductContext = createContext({} as ProductContextProps)

export const ProductContextProvider = ({
  children
}: ProductContextProviderProps) => {
  const [currentProducts, setCurrentProducts] = useState<Product[]>()
  const [currentProduct, setCurrentProduct] = useState<Product>()
  const [productDataForm, setProductDataForm] = useState({} as Product)
  const inputFileRef = useRef<HTMLInputElement>(null)

  const productsCollectionRef = collection(db, 'products')

  const getProducts = async () => {
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

  const getProductsByQuery = async (field: string, value: string) => {
    try {
      const givenQuery = query(
        productsCollectionRef,
        where(field, '==', value),
        orderBy('timestamp', 'desc'),
        limit(10)
      )
      const querySnapshot = await getDocs(givenQuery)

      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))

      return data
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
      console.error(error)
    }
  }

  const getProduct = async (productId: string) => {
    const docRef = doc(db, 'products', productId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setCurrentProduct({ ...docSnap.data(), id: docSnap.id })
    }
  }

  const getProductOnTime = async (productId: string) => {
    const docRef = doc(db, 'products', productId)

    onSnapshot(docRef, (docSnap) => {
      setCurrentProduct({ ...docSnap.data(), id: docSnap.id })
    })
  }

  const createProduct = async () => {
    if (auth.currentUser && productDataForm.name) {
      const docRef = await addDoc(collection(db, 'products'), {
        name: productDataForm?.name,
        brand: productDataForm?.brand,
        price: productDataForm?.price! * 1,
        bestPrice: productDataForm?.bestPrice! * 1,
        description: productDataForm?.description,
        timestamp: serverTimestamp()
      })

      if (inputFileRef.current !== null) {
        await uploadFile(docRef.id)

        toast.success(`Produto cadastrado com sucesso`)
      }
    }
  }

  const uploadFile = async (productId: string) => {
    if (inputFileRef.current !== null) {
      const file = inputFileRef.current
      const image = file.files && file.files[0]

      if (image) {
        const storageRef = ref(storage, `/${productId}/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image)
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            toast.success(`Upload de foto realizado com sucesso`)
          },
          (error: any) => {
            toast.error(firebaseErrorHandler(error.code))
            console.error(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) =>
              pushImgUrl(url, productId)
            )
          }
        )
      }
    }
  }

  const pushImgUrl = async (url: string, productId: string) => {
    const docRef = doc(db, 'products', productId)
    await updateDoc(docRef, {
      mainImg: url,
      images: arrayUnion(url)
    })
  }

  const handleChangeMainImg = async (newImage: string) => {
    if (currentProduct?.id) {
      const docRef = doc(db, 'products', currentProduct?.id)

      await updateDoc(docRef, {
        mainImg: newImage
      })
      toast.success(`Foto principal atualizada com sucesso`)
    }
  }

  const updateProduct = async () => {
    if (currentProduct?.id) {
      const docRef = doc(db, 'products', currentProduct?.id)

      await updateDoc(docRef, {
        name: productDataForm?.name,
        brand: productDataForm?.brand,
        price: productDataForm?.price! * 1,
        bestPrice: productDataForm?.bestPrice! * 1,
        description: productDataForm?.description,
        timestamp: serverTimestamp()
      })
      toast.success(`Produto atualizado com sucesso`)
    }
  }

  const deleteProduct = async () => {
    if (currentProduct?.id) {
      const docRef = doc(db, 'products', currentProduct?.id)

      await deleteDoc(docRef)
      toast.success(`Produto removido com sucesso`)
    }
  }

  return (
    <ProductContext.Provider
      value={{
        currentProducts,
        setCurrentProducts,
        currentProduct,
        setCurrentProduct,
        createProduct,
        getProducts,
        getProduct,
        getProductOnTime,
        productDataForm,
        setProductDataForm,
        uploadFile,
        inputFileRef,
        handleChangeMainImg,
        updateProduct,
        deleteProduct,
        getProductsByQuery
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => {
  return useContext(ProductContext)
}
