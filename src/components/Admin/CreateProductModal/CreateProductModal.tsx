import { FormEvent, useCallback, useEffect } from 'react'
import { useAdminContext } from '../../../contexts/AdminContext'
import { useGlobalContext } from '../../../contexts/GlobalContext'
import { useProductContext } from '../../../contexts/ProductContext'
import Button from '../../Button'
import Heading from '../../Heading'
import Input from '../../Input'
import Modal from '../../Modal'
import TextArea from '../../TextArea'
import ColorsField from './ColorsField'
import SizesField from './SizesField'

const CreateProductModal = () => {
  const { isMobile } = useGlobalContext()

  const {
    modalStatus,
    setModalStatus,
    editMode,
    setEditMode,
    setProductDataForm,
    productDataForm,
    currentProduct,
    createProduct,
    updateProduct,
    inputFileRef,
    handleChangeMainImg,
    uploadFile
  } = useAdminContext()

  const { getProductsByClient } = useProductContext()

  useEffect(() => {
    setProductDataForm({
      id: currentProduct?.id,
      name: currentProduct?.name,
      category: currentProduct?.category,
      brand: currentProduct?.brand,
      price: currentProduct?.price,
      bestPrice: currentProduct?.bestPrice,
      description: currentProduct?.description,
      colors: currentProduct?.colors,
      sizes: currentProduct?.sizes
    })
  }, [currentProduct])

  const handleProduct = useCallback(
    (e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => {
      setProductDataForm({
        ...productDataForm,
        [e.currentTarget.name]: e.currentTarget.value
      })
    },
    [productDataForm]
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    editMode ? handleUpdateProduct() : handleCreateProduct()
  }

  const handleCreateProduct = () => {
    createProduct()
    getProductsByClient()
  }

  const handleUpdateProduct = () => {
    updateProduct()
    setEditMode(false)
    setModalStatus(null)
    getProductsByClient()
  }

  return (
    <Modal widthFit modalStatus={modalStatus} setModalStatus={setModalStatus}>
      <form
        className="m-auto flex flex-col gap-6 w-full md:w-fit"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Heading
          text={editMode ? 'Editar produto' : 'Novo produto'}
          small
          center
        />
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <Input
              text="Nome:"
              name="name"
              htmlFor="productName"
              required
              widthFull
              onChange={handleProduct}
              value={productDataForm?.name}
            />
            <fieldset className="flex flex-col lg:flex-row gap-6">
              <Input
                text="Categoria:"
                name="category"
                htmlFor="productCategory"
                required
                onChange={handleProduct}
                value={productDataForm?.category}
              />
              <Input
                text="Marca:"
                name="brand"
                htmlFor="productBrand"
                required
                onChange={handleProduct}
                value={productDataForm?.brand}
              />
            </fieldset>
            <fieldset className="flex gap-6 max-w-xs">
              <Input
                text="Preço:"
                name="price"
                type="number"
                widthFull
                onChange={handleProduct}
                value={productDataForm?.price}
              />
              <Input
                text="Melhor Preço:"
                name="bestPrice"
                type="number"
                htmlFor="productBestPrice"
                widthFull
                onChange={handleProduct}
                value={productDataForm?.bestPrice}
              />
            </fieldset>
          </div>
          <div className="flex flex-col gap-4 h-full">
            <TextArea
              text="Descrição:"
              name="description"
              htmlFor="productDescription"
              required
              widthFull
              onChange={handleProduct}
              value={productDataForm?.description}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <ColorsField />

          <div className="flex flex-col gap-4">
            <Input
              text={editMode ? 'Nova foto:' : 'Foto principal:'}
              name="mainImg"
              type="file"
              htmlFor="productMainImg"
              widthFull
              onChange={handleProduct}
              value={productDataForm?.mainImg}
              reference={inputFileRef}
              accept="image/x-png,image/jpeg,image/jpg"
            />

            {editMode && (
              <div>
                <Button
                  primary
                  text="Upload"
                  widthFull={isMobile}
                  onClick={() => {
                    currentProduct?.id && uploadFile(currentProduct?.id)
                  }}
                />
              </div>
            )}

            {editMode && (
              <div className="flex gap-2">
                {currentProduct &&
                  currentProduct.images?.map((image, index) => (
                    <div
                      key={index}
                      style={{
                        background: `no-repeat center/cover url(${image})`
                      }}
                      className={`
                        w-20 h-20 rounded-sm
                        ${
                          image === currentProduct.mainImg &&
                          'border-4 border-primary'
                        }
                      `}
                      onClick={() => handleChangeMainImg(image.toString())}
                    ></div>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <SizesField />
        </div>

        <div className="flex justify-center flex-wrap gap-4 flex-1">
          <Button
            type="submit"
            primary
            text={editMode ? 'Editar' : 'Cadastrar'}
            widthFull={isMobile}
          />
        </div>
      </form>
    </Modal>
  )
}

export default CreateProductModal
