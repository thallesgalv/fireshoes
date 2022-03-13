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
  widthFit?: boolean
}

const Modal = ({
  children,
  modalStatus,
  setModalStatus,
  widthFit
}: ModalProps) => {
  const modalContainer = useRef(null)

  const handleModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalContainer.current) setModalStatus(null)
  }

  return (
    <div
      className={`
          ${modalStatus ? 'block' : 'hidden'}
          w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 grid place-items-center z-20 overflow-y-scroll
        `}
      onClick={handleModal}
      ref={modalContainer}
    >
      <div
        className={`
            p-8 bg-white m-auto rounded relative animate-show
            w-11/12 ${widthFit ? 'md:w-fit' : 'md:w-96'}
        `}
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
