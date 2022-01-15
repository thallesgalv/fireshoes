import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc
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
  price?: number
  mainImg?: string
  created?: string
}

interface ProductContextProps {
  currentProducts: Product[] | undefined
  setCurrentProducts: (param: Product[] | undefined) => void
  currentProduct: Product | undefined
  setCurrentProduct: (param: Product | undefined) => void
  getProducts: () => void
  getProduct: (param: string) => void
  createProduct: () => void
  productDataForm: Product
  setProductDataForm: (obj: Product) => void
  uploadFile: (file: any, productId: string) => void
  uploadProgress: number
  setUploadProgress: (arg: number) => void
  inputFileRef: MutableRefObject<HTMLInputElement | null>
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
  const [uploadProgress, setUploadProgress] = useState(0)
  const inputFileRef = useRef<HTMLInputElement>(null)

  const productsCollectionRef = collection(db, 'products')

  const getProducts = async () => {
    try {
      if (auth.currentUser) {
        const querySnapshot = await getDocs(productsCollectionRef)
        setCurrentProducts(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      }
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  const getProduct = async (productId: string) => {
    const docRef = doc(db, 'products', productId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) setCurrentProduct(docSnap.data())
  }

  const createProduct = async () => {
    if (auth.currentUser) {
      const docRef = await addDoc(collection(db, 'products'), {
        name: productDataForm?.name,
        price: productDataForm?.price
      })

      toast.success(`Produto criado com sucesso`)

      if (inputFileRef.current !== null) {
        const file = inputFileRef.current
        const image = file.files && file.files[0]
        await uploadFile(image, docRef.id)
      }
    }
  }

  const uploadFile = async (file: any, productId: string) => {
    if (file) {
      const storageRef = ref(storage, `/${productId}/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          setUploadProgress(progress)
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

  const pushImgUrl = async (url: string, productId: string) => {
    const docRef = doc(db, 'products', productId)
    await updateDoc(docRef, {
      mainImg: url || 'não carregou'
    })
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
        productDataForm,
        setProductDataForm,
        uploadFile,
        uploadProgress,
        setUploadProgress,
        inputFileRef
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => {
  return useContext(ProductContext)
}
