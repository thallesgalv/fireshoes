import { collection } from 'firebase/firestore'
import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useRef,
  useState
} from 'react'
import toast from 'react-hot-toast'
import { ModalStatus } from '../components/Modal'
import { auth } from '../firebase/auth'
import { firebaseErrorHandler } from '../firebase/firebaseErrorHandler'
import { db } from '../firebase/firestore'
import { storage } from '../firebase/storage'
import { Product } from '../types/interfaces'

const getFirestore = () => import('../firebase/firestore')
const getStorage = () => import('../firebase/storage')

interface AdminContextProps {
  currentProduct?: Product
  setCurrentProduct: (arg: Product | undefined) => void
  getProductByClient: (productId: string) => void
  getProductOnTime: (productId: string) => void
  createProduct: () => void
  productDataForm: Product
  setProductDataForm: (obj: Product) => void
  modalStatus: ModalStatus
  setModalStatus: (modalStatus: ModalStatus) => void
  editMode: boolean
  setEditMode: (editMode: boolean) => void
  uploadFile: (productId: string) => void
  inputFileRef: MutableRefObject<HTMLInputElement | null>
  handleChangeMainImg: (newImage: string) => void
  updateProduct: () => void
  deleteProduct: () => void
}

interface AdminContextProviderProps {
  children: ReactNode
}

export const AdminContext = createContext({} as AdminContextProps)

export const AdminContextProvider = ({
  children
}: AdminContextProviderProps) => {
  const [currentProduct, setCurrentProduct] = useState<Product>()
  const [productDataForm, setProductDataForm] = useState({} as Product)
  const [modalStatus, setModalStatus] = useState<ModalStatus>(null)
  const [editMode, setEditMode] = useState(false)
  const inputFileRef = useRef<HTMLInputElement>(null)

  const getProductByClient = async (productId: string) => {
    const { doc, getDoc } = await getFirestore()

    const docRef = doc(db, 'products', productId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setCurrentProduct({ ...docSnap.data(), id: docSnap.id })
    }
  }

  const getProductOnTime = async (productId: string) => {
    const { doc, onSnapshot } = await getFirestore()

    const docRef = doc(db, 'products', productId)

    onSnapshot(docRef, (docSnap) => {
      setCurrentProduct({ ...docSnap.data(), id: docSnap.id })
    })
  }

  const createProduct = async () => {
    const { addDoc, serverTimestamp } = await getFirestore()

    if (auth.currentUser && productDataForm.name) {
      const docRef = await addDoc(collection(db, 'products'), {
        name: productDataForm?.name,
        category: productDataForm?.category,
        brand: productDataForm?.brand,
        price: productDataForm?.price! * 1,
        bestPrice: productDataForm?.bestPrice! * 1,
        description: productDataForm?.description,
        colors: productDataForm?.colors,
        sizes: productDataForm?.sizes,
        timestamp: serverTimestamp()
      })

      if (inputFileRef.current !== null) {
        await uploadFile(docRef.id)

        toast.success(`Produto cadastrado com sucesso`)
      }
    }
  }

  const uploadFile = async (productId: string) => {
    const { ref, uploadBytesResumable, getDownloadURL } = await getStorage()

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
    const { doc, updateDoc, arrayUnion } = await getFirestore()

    const docRef = doc(db, 'products', productId)
    await updateDoc(docRef, {
      mainImg: url,
      images: arrayUnion(url)
    })
  }

  const handleChangeMainImg = async (newImage: string) => {
    const { doc, updateDoc } = await getFirestore()

    if (currentProduct?.id) {
      const docRef = doc(db, 'products', currentProduct?.id)

      await updateDoc(docRef, {
        mainImg: newImage
      })
      toast.success(`Foto principal atualizada com sucesso`)
    }
  }

  const updateProduct = async () => {
    const { doc, updateDoc, serverTimestamp } = await getFirestore()

    if (currentProduct?.id) {
      const docRef = doc(db, 'products', currentProduct?.id)

      await updateDoc(docRef, {
        name: productDataForm?.name,
        category: productDataForm?.category,
        brand: productDataForm?.brand,
        price: productDataForm?.price! * 1,
        bestPrice: productDataForm?.bestPrice! * 1,
        description: productDataForm?.description,
        colors: productDataForm?.colors,
        sizes: productDataForm?.sizes,
        timestamp: serverTimestamp()
      })
      toast.success(`Produto atualizado com sucesso`)
    }
  }

  const deleteProduct = async () => {
    const { doc, deleteDoc } = await getFirestore()

    if (currentProduct?.id) {
      const docRef = doc(db, 'products', currentProduct?.id)

      await deleteDoc(docRef)
      toast.success(`Produto removido com sucesso`)
    }
  }

  return (
    <AdminContext.Provider
      value={{
        currentProduct,
        setCurrentProduct,
        createProduct,
        getProductByClient,
        getProductOnTime,
        productDataForm,
        setProductDataForm,
        modalStatus,
        setModalStatus,
        editMode,
        setEditMode,
        uploadFile,
        inputFileRef,
        handleChangeMainImg,
        updateProduct,
        deleteProduct
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export const useAdminContext = () => {
  return useContext(AdminContext)
}
