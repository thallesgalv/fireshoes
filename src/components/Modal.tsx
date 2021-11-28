import { ReactNode, useRef } from 'react'
import { MdClose } from 'react-icons/md'

interface ModalProps {
  children: ReactNode
  modalActive: boolean
  setModalActive: (bool: boolean) => void
}

function Modal({ children, modalActive, setModalActive }: ModalProps) {
  const modalContainer = useRef(null)

  function handleModal(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === modalContainer.current) setModalActive(!modalActive)
  }

  return (
    <div
      className={`
          ${modalActive ? 'block' : 'hidden'}
          w-screen h-screen bg-black bg-opacity-50 fixed top-0 grid place-items-center z-10
        `}
      onClick={handleModal}
      ref={modalContainer}
    >
      <div
        className="bg-white p-8 m-auto rounded relative animate-show"
        style={{ width: 'calc(min(90%, 30rem))' }}
      >
        <div
          className="text-primary text-3xl absolute right-0 top-0 m-2 cursor-pointer"
          onClick={() => setModalActive(false)}
        >
          <MdClose />
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
