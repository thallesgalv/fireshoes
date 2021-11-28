import { ReactNode, useRef } from 'react'

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
        className="bg-white p-8 m-auto rounded animate-show"
        style={{ width: 'calc(min(90%, 30rem))' }}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
