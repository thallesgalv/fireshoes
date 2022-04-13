import { useState } from 'react'
import { MdNotInterested } from 'react-icons/md'
import { useAdminContext } from '../../../../contexts/AdminContext'
import { useGlobalContext } from '../../../../contexts/GlobalContext'
import Button from '../../../Button'
import Input from '../../../Input'

const ColorsField = () => {
  const [currentColor, setCurrentColor] = useState('')

  const { productDataForm, setProductDataForm } = useAdminContext()
  const { isMobile } = useGlobalContext()

  const handleInsertColor = () => {
    setProductDataForm({
      ...productDataForm,
      colors: productDataForm.colors
        ? [...productDataForm.colors, currentColor]
        : [currentColor]
    })
  }

  const handleDeleteColor = (colorIndex: number) => {
    setProductDataForm({
      ...productDataForm,
      colors:
        productDataForm.colors &&
        [...productDataForm.colors].filter((item, idx) => idx !== colorIndex)
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        text="Cores:"
        name="currentColor"
        htmlFor="productCurrentColor"
        widthFull
        onChange={(e) => setCurrentColor(e.target.value)}
        value={currentColor}
      />
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Button
          primary
          text="Inserir cor"
          widthFull={isMobile}
          onClick={handleInsertColor}
        />
        {productDataForm && (
          <div className="flex flex-wrap gap-2 text-secondary">
            {productDataForm?.colors?.map((color, idx) => (
              <div className="flex" key={idx}>
                <div>{color}</div>
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => handleDeleteColor(idx)}
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

export default ColorsField
