import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md'
import { useAdminContext } from '../../../../contexts/AdminContext'

interface TableActionsProps {
  id?: string
}

const TableActions = ({ id }: TableActionsProps) => {
  const { setEditMode, setModalStatus, getProductOnTime } = useAdminContext()

  const twTdActions =
    'p-4 text-3xl text-center text-primary cursor-pointer border border-primary'

  const handleEditProduct = (productId?: string) => {
    setEditMode(true)
    setModalStatus('createProductModal')
    if (productId) getProductOnTime(productId)
  }

  const handleDeleteProduct = (productId?: string) => {
    setModalStatus('confirmationModal')
    if (productId) getProductOnTime(productId)
  }

  return (
    <>
      <td className={twTdActions} onClick={() => handleEditProduct(id)}>
        <MdOutlineEdit />
      </td>
      <td className={twTdActions} onClick={() => handleDeleteProduct(id)}>
        <MdDeleteOutline />
      </td>
    </>
  )
}

export default TableActions
