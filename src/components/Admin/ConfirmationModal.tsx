import { useAdminContext } from '../../contexts/AdminContext'
import { useProductContext } from '../../contexts/ProductContext'
import Button from '../Button'
import Heading from '../Heading'
import Modal from '../Modal'

const ConfirmationModal = () => {
  const { modalStatus, setModalStatus, deleteProduct } = useAdminContext()
  const { getProductsByClient } = useProductContext()

  return (
    <Modal modalStatus={modalStatus} setModalStatus={setModalStatus}>
      <Heading text="Tem certeza?" small center />
      <div className="flex justify-center gap-6 mt-6">
        <Button
          secondary
          text="Sim"
          widthFull
          onClick={() => {
            deleteProduct()
            setModalStatus(null)
            getProductsByClient()
          }}
        />
        <Button
          primary
          text="Não"
          widthFull
          onClick={() => setModalStatus(null)}
        />
      </div>
    </Modal>
  )
}

export default ConfirmationModal
