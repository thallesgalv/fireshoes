import { useState } from 'react'
import { MdNotInterested } from 'react-icons/md'
import { useAdminContext } from '../../../contexts/AdminContext'
import { useGlobalContext } from '../../../contexts/GlobalContext'
import Button from '../../Button'
import Input from '../../Input'

const SizesField = () => {
  const [currentSize, setCurrentSize] = useState('')

  const { productDataForm, setProductDataForm } = useAdminContext()
  const { isMobile } = useGlobalContext()

  const handleInsertSize = () => {
    setProductDataForm({
      ...productDataForm,
      sizes: productDataForm.sizes
        ? [...productDataForm.sizes, currentSize]
        : [currentSize]
    })
  }

  const handleDeleteSize = (sizeIndex: number) => {
    setProductDataForm({
      ...productDataForm,
      sizes:
        productDataForm.sizes &&
        [...productDataForm.sizes].filter((item, idx) => idx !== sizeIndex)
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        text="Tamanhos:"
        name="currentSize"
        htmlFor="productCurrentSize"
        widthFull
        onChange={(e) => setCurrentSize(e.target.value)}
        value={currentSize}
      />
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Button
          primary
          text="Inserir tamanho"
          widthFull={isMobile}
          onClick={handleInsertSize}
        />
        {productDataForm && (
          <div className="flex flex-wrap gap-2 text-secondary">
            {productDataForm?.sizes?.map((size, idx) => (
              <div className="flex" key={idx}>
                <div>{size} </div>
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => handleDeleteSize(idx)}
                >
                  <MdNotInterested size={12} />
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SizesField
