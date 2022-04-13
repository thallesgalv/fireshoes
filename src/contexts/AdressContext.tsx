import { doc } from 'firebase/firestore'
import { createContext, ReactNode, useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { firebaseErrorHandler } from '../firebase/firebaseErrorHandler'
import { db } from '../firebase/firestore'
import { Adress } from '../types/interfaces'
import { useUserContext } from './UserContext'
const getFirestore = () => import('../firebase/firestore')

interface AdressContextProviderProps {
  children: ReactNode
}

interface AdressContextProps {
  adressDataForm: Adress
  setAdressDataForm: (obj: Adress) => void
  setActiveAdress: (arg: number) => void
  setAdress: () => void
  deleteAdress: (arg: number) => void
  updateAdress: (arg: number) => void
}

const AdressContext = createContext({} as AdressContextProps)

export const AdressContextProvider = ({
  children
}: AdressContextProviderProps) => {
  const [adressDataForm, setAdressDataForm] = useState({} as Adress)

  const { currentUser } = useUserContext()
  const currentUserRef = doc(db, 'users', currentUser?.uid || 'noUid')

  const setActiveAdress = async (arg: number) => {
    const { updateDoc } = await getFirestore()

    try {
      await updateDoc(currentUserRef, {
        selectedAdress: arg
      })
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  const setAdress = async () => {
    const { updateDoc, arrayUnion } = await getFirestore()

    try {
      if (currentUser?.adressList && currentUser.adressList.length < 3) {
        await updateDoc(currentUserRef, {
          adressList: arrayUnion(adressDataForm),
          selectedAdress: currentUser?.adressList?.length || 0
        })
        toast.success(`Endereço cadastrado com sucesso`)
      } else {
        toast.error(`Você só pode possuir até três endereços cadastrados.`)
      }
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  const deleteAdress = async (arg: number) => {
    const { updateDoc, arrayRemove } = await getFirestore()

    try {
      await updateDoc(currentUserRef, {
        adressList: arrayRemove(currentUser?.adressList?.[arg])
      })
      toast.success(`Endereço removido com sucesso`)
      currentUser?.adressList &&
        setActiveAdress(currentUser?.adressList.length - 2)
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  const updateAdress = async (arg: number) => {
    const { updateDoc, arrayRemove, arrayUnion } = await getFirestore()

    try {
      await updateDoc(currentUserRef, {
        adressList: arrayRemove(currentUser?.adressList?.[arg])
      })

      await updateDoc(currentUserRef, {
        adressList: arrayUnion(adressDataForm)
      })

      currentUser?.adressList &&
        setActiveAdress(currentUser?.adressList.length - 1)
      toast.success(`Endereço atualizado com sucesso`)
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  return (
    <AdressContext.Provider
      value={{
        adressDataForm,
        setAdressDataForm,
        setActiveAdress,
        setAdress,
        deleteAdress,
        updateAdress
      }}
    >
      {children}
    </AdressContext.Provider>
  )
}

export const useAdressContext = () => useContext(AdressContext)
