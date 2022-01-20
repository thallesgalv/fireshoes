import { ReactNode, useRef } from 'react'
import { MdClose } from 'react-icons/md'

export type ModalStatus =
  | null
  | 'createAccountModal'
  | 'forgotPasswordModal'
  | 'createPaymentMethodModal'
  | 'createAdressModal'
  | 'createProductModal'
  | 'confirmationModal'

interface ModalProps {
  children: ReactNode
  modalStatus: ModalStatus
  setModalStatus: (arg: ModalStatus) => void
}

const Modal = ({ children, modalStatus, setModalStatus }: ModalProps) => {
  const modalContainer = useRef(null)

  const handleModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalContainer.current) setModalStatus(null)
  }

  return (
    <div
      className={`
          ${modalStatus ? 'block' : 'hidden'}
          w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 grid place-items-center z-10
        `}
      onClick={handleModal}
      ref={modalContainer}
    >
      <div
        className="bg-white p-8 m-auto rounded relative animate-show"
        style={{ width: 'calc(min(91.666667%, 30rem))' }}
      >
        <div
          className="text-primary text-3xl absolute right-0 top-0 m-2 cursor-pointer"
          onClick={() => setModalStatus(null)}
        >
          <MdClose />
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
