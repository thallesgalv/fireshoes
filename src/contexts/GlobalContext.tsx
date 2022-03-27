import { createContext, ReactNode, useContext, useState } from 'react'
import { ModalStatus } from '../components/Modal'
import useMedia from '../hooks/useMedia'

interface GlobalContextProps {
  isMobile: boolean
  miniCartActive: boolean
  setMiniCartActive: (arg: boolean) => void
  checkoutStep: CheckoutStep
  setCheckoutStep: (arg: CheckoutStep) => void
  editMode: boolean
  setEditMode: (arg: boolean) => void
  modalStatus: ModalStatus
  setModalStatus: (arg: ModalStatus) => void
  sucessOrder: boolean
  setSucessOrder: (arg: boolean) => void
}

interface GlobalContextProviderProps {
  children: ReactNode
}

type CheckoutStep = 'cart' | 'adress' | 'payment' | 'confirmation' | 'sucess'

export const GlobalContext = createContext({} as GlobalContextProps)

export const GlobalContextProvider = ({
  children
}: GlobalContextProviderProps) => {
  const isMobile = useMedia('(max-width: 768px)')
  const [miniCartActive, setMiniCartActive] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart')
  const [editMode, setEditMode] = useState(false)
  const [modalStatus, setModalStatus] = useState<ModalStatus>(null)
  const [sucessOrder, setSucessOrder] = useState(false)

  return (
    <GlobalContext.Provider
      value={{
        isMobile,
        miniCartActive,
        setMiniCartActive,
        checkoutStep,
        setCheckoutStep,
        editMode,
        setEditMode,
        modalStatus,
        setModalStatus,
        sucessOrder,
        setSucessOrder
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
