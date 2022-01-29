import { createContext, useContext, useState, ReactNode } from 'react'
import { ModalStatus } from '../components/Modal'
import useMedia from '../hooks/useMedia'

interface GlobalContextProps {
  isMobile: boolean
  menuActive: boolean
  setMenuActive: (arg: boolean) => void
  miniCartActive: boolean
  setMiniCartActive: (arg: boolean) => void
  checkoutStep: CheckoutStep
  setCheckoutStep: (arg: CheckoutStep) => void
  editMode: boolean
  setEditMode: (arg: boolean) => void
  modalStatus: ModalStatus
  setModalStatus: (arg: ModalStatus) => void
}

interface GlobalContextProviderProps {
  children: ReactNode
}

type CheckoutStep = 'cart' | 'adress' | 'payment' | 'sucess'

export const GlobalContext = createContext({} as GlobalContextProps)

export const GlobalContextProvider = ({
  children
}: GlobalContextProviderProps) => {
  const isMobile = useMedia('(max-width: 768px)')
  const [menuActive, setMenuActive] = useState(false)
  const [miniCartActive, setMiniCartActive] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart')
  const [editMode, setEditMode] = useState(false)
  const [modalStatus, setModalStatus] = useState<ModalStatus>(null)

  return (
    <GlobalContext.Provider
      value={{
        isMobile,
        menuActive,
        setMenuActive,
        miniCartActive,
        setMiniCartActive,
        checkoutStep,
        setCheckoutStep,
        editMode,
        setEditMode,
        modalStatus,
        setModalStatus
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
