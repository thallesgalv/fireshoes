import { doc } from 'firebase/firestore'
import { createContext, ReactNode, useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { firebaseErrorHandler } from '../firebase/firebaseErrorHandler'
import { db } from '../firebase/firestore'
import { PaymentMethod } from '../types/interfaces'
import { useUserContext } from './UserContext'
const getFirestore = () => import('../firebase/firestore')

interface PaymentMethodContextProviderProps {
  children: ReactNode
}

interface PaymentMethodContextProps {
  paymentMethodDataForm: PaymentMethod
  setPaymentMethodDataForm: (obj: PaymentMethod) => void
  setActivePaymentMethod: (arg: number) => void
  setPaymentMethod: () => void
  deletePaymentMethod: (arg: number) => void
  updatePaymentMethod: (arg: number) => void
}

const PaymentMethodContext = createContext({} as PaymentMethodContextProps)

export const PaymentMethodContextProvider = ({
  children
}: PaymentMethodContextProviderProps) => {
  const [paymentMethodDataForm, setPaymentMethodDataForm] = useState(
    {} as PaymentMethod
  )
  const { currentUser } = useUserContext()
  const currentUserRef = doc(db, 'users', currentUser?.uid || 'noUid')

  const setActivePaymentMethod = async (arg: number) => {
    const { updateDoc } = await getFirestore()

    try {
      await updateDoc(currentUserRef, {
        selectedPaymentMethod: arg
      })
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  const setPaymentMethod = async () => {
    const { updateDoc, arrayUnion } = await getFirestore()

    try {
      if (
        currentUser?.paymentMethodList &&
        currentUser.paymentMethodList.length < 3
      ) {
        await updateDoc(currentUserRef, {
          paymentMethodList: arrayUnion(paymentMethodDataForm),
          selectedPaymentMethod: currentUser?.paymentMethodList?.length || 0
        })
        toast.success(`Meio de pagamento cadastrado com sucesso`)
      } else {
        toast.error(
          `Você só pode possuir até três meios de pagamento cadastrados.`
        )
      }
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  const deletePaymentMethod = async (arg: number) => {
    const { updateDoc, arrayRemove } = await getFirestore()

    try {
      await updateDoc(currentUserRef, {
        paymentMethodList: arrayRemove(currentUser?.paymentMethodList?.[arg])
      })
      toast.success(`Meio de pagamento removido com sucesso`)
      currentUser?.paymentMethodList &&
        setActivePaymentMethod(currentUser?.paymentMethodList.length - 2)
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  const updatePaymentMethod = async (arg: number) => {
    const { updateDoc, arrayRemove, arrayUnion } = await getFirestore()

    try {
      await updateDoc(currentUserRef, {
        paymentMethodList: arrayRemove(currentUser?.paymentMethodList?.[arg])
      })

      await updateDoc(currentUserRef, {
        paymentMethodList: arrayUnion(paymentMethodDataForm)
      })

      currentUser?.paymentMethodList &&
        setActivePaymentMethod(currentUser?.paymentMethodList.length - 1)
      toast.success(`Meio de pagamento atualizado com sucesso`)
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error.code))
    }
  }

  return (
    <PaymentMethodContext.Provider
      value={{
        paymentMethodDataForm,
        setPaymentMethodDataForm,
        setActivePaymentMethod,
        setPaymentMethod,
        deletePaymentMethod,
        updatePaymentMethod
      }}
    >
      {children}
    </PaymentMethodContext.Provider>
  )
}

export const usePaymentMethodContext = () => useContext(PaymentMethodContext)
