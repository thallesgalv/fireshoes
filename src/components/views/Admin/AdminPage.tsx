import { useEffect } from 'react'
import { useAdminContext } from '../../../contexts/AdminContext'
import { Product, useProductContext } from '../../../contexts/ProductContext'
import Button from '../../Button'
import Heading from '../../Heading'
import ConfirmationModal from './ConfirmationModal'
import CreateProductModal from './CreateProductModal/CreateProductModal'
import Table from './Table/Table'

const AdminPage = () => {
  const {
    modalStatus,
    setModalStatus,
    setEditMode,
    setCurrentProduct,
    setProductDataForm
  } = useAdminContext()
  const { getProductsByClient } = useProductContext()

  useEffect(() => {
    setProductDataForm({} as Product)
    // setCurrentColor('')
    setCurrentProduct(undefined)
  }, [modalStatus])

  return (
    <>
      <Heading text="Painel" center />
      <section className="flex flex-col gap-8 w-11/12 lg:w-full m-auto">
        <ul className="flex justify-center gap-4">
          <Button
            primary
            text="Cadastrar novo"
            onClick={() => {
              setEditMode(false)
              setModalStatus('createProductModal')
            }}
          />
          <Button
            secondary
            text="Carregar produtos"
            onClick={getProductsByClient}
          />
        </ul>

        <div className="flex justify-center">
          <Table />
        </div>

        {modalStatus === 'createProductModal' && <CreateProductModal />}

        {modalStatus === 'confirmationModal' && <ConfirmationModal />}
      </section>
    </>
  )
}

export default AdminPage
