import type { NextPage } from 'next'
import Head from 'next/head'
import { FormEvent, useCallback, useEffect, useState } from 'react'
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md'
import Button from '../components/Button'
import Heading from '../components/Heading'
import Input from '../components/Input'
import Modal, { ModalStatus } from '../components/Modal'
import { Product, useProductContext } from '../contexts/ProductContext'
import { currency } from '../utils/calculations'
import { useGlobalContext } from '../contexts/GlobalContext'
import TextArea from '../components/TextArea'
import Link from 'next/link'
import { normalizeString } from '../utils/normalizeString'
import Image from 'next/image'

const Admin: NextPage = () => {
  const [modalStatus, setModalStatus] = useState<ModalStatus>(null)
  const [editMode, setEditMode] = useState(false)
  const { isMobile } = useGlobalContext()

  const {
    currentProducts,
    currentProduct,
    setCurrentProduct,
    createProduct,
    getProducts,
    getProductOnTime,
    productDataForm,
    setProductDataForm,
    uploadFile,
    inputFileRef,
    handleChangeMainImg,
    updateProduct,
    deleteProduct
  } = useProductContext()

  useEffect(() => {
    getProducts()
  }, [])

  const handleProduct = useCallback(
    (e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => {
      setProductDataForm({
        ...productDataForm,
        [e.currentTarget.name]: e.currentTarget.value
      })
    },
    [productDataForm]
  )

  useEffect(() => {
    setProductDataForm({
      id: currentProduct?.id,
      name: currentProduct?.name,
      brand: currentProduct?.brand,
      price: currentProduct?.price,
      bestPrice: currentProduct?.bestPrice,
      description: currentProduct?.description
    })
  }, [currentProduct])

  useEffect(() => {
    setProductDataForm({} as Product)
    setCurrentProduct(undefined)
  }, [modalStatus])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    editMode ? handleUpdateProduct() : handleCreateProduct()
  }

  const handleCreateProduct = () => {
    createProduct()
    getProducts()
  }

  const handleEditProduct = (productId?: string) => {
    setEditMode(true)
    setModalStatus('createProductModal')

    if (productId) getProductOnTime(productId)
  }

  const handleUpdateProduct = () => {
    updateProduct()
    setEditMode(false)
    setModalStatus(null)
    getProducts()
  }

  const handleDeleteProduct = (productId?: string) => {
    setModalStatus('confirmationModal')
    if (productId) getProductOnTime(productId)
  }

  return (
    <>
      <Head>
        <title>Fireshoes 🔥 | Área do Usuário</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          <Button secondary text="Carregar produtos" onClick={getProducts} />
        </ul>

        <div className="flex justify-center">
          {currentProducts && currentProducts?.length > 0 && (
            <div className="overflow-x-auto">
              <table className="border border-primary ">
                <thead>
                  <tr className="border border-primary bg-primary text-white">
                    <th className="text-center p-2 border border-white">
                      Editar
                    </th>
                    <th className="text-center p-2 border border-white">
                      Excluir
                    </th>
                    <th className="text-center p-2 border border-white">Id</th>
                    <th className="text-center p-2 border border-white">
                      Link
                    </th>
                    <th className="text-center p-2 border border-white">
                      Marca
                    </th>
                    <th className="text-center p-2 border border-white">
                      Nome
                    </th>
                    <th className="text-center p-2 border border-white">
                      Foto Principal Foto Principal
                    </th>
                    <th className="text-center p-2 border border-white">
                      Preço
                    </th>
                    <th className="text-center p-2 border border-white">
                      Melhor Preço
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts?.map(
                    ({ id, name, brand, price, bestPrice, mainImg }) => (
                      <tr key={id} className="border border-primary">
                        <td
                          className="p-4 text-3xl text-center text-primary cursor-pointer border border-primary"
                          onClick={() => handleEditProduct(id)}
                        >
                          <MdOutlineEdit />
                        </td>
                        <td
                          className="p-4 text-3xl text-center text-primary cursor-pointer border border-primary"
                          onClick={() => handleDeleteProduct(id)}
                        >
                          <MdDeleteOutline />
                        </td>
                        <td className="border border-primary p-2 text-center text-secondary">
                          {id}
                        </td>
                        <td className="border border-primary p-2 text-center text-secondary">
                          <Link
                            href={`/product/${normalizeString(name)}/${id}`}
                          >
                            <a>Link</a>
                          </Link>
                        </td>
                        <td className="border border-primary p-2 text-center text-secondary">
                          {brand}
                        </td>
                        <td className="border border-primary p-2 text-center text-secondary">
                          {name}
                        </td>
                        <td className="flex justify-center p-2 text-center">
                          <div
                            className="w-20 h-20"
                            style={{
                              background: `no-repeat center/cover url(${mainImg})`
                            }}
                          ></div>
                        </td>
                        <td className="border border-primary p-2 text-center text-secondary">
                          {currency(price)}
                        </td>
                        <td className="border border-primary p-2 text-center text-secondary">
                          {currency(bestPrice)}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {modalStatus === 'createProductModal' && (
          <Modal modalStatus={modalStatus} setModalStatus={setModalStatus}>
            <form
              className="m-auto flex flex-col gap-6 w-full md:w-80"
              onSubmit={(e) => handleSubmit(e)}
            >
              <Heading
                text={editMode ? 'Editar produto' : 'Novo produto'}
                small
                center
              />
              <Input
                text="Nome:"
                name="name"
                htmlFor="productName"
                required
                widthFull
                onChange={handleProduct}
                value={productDataForm?.name}
              />
              <Input
                text="Marca:"
                name="brand"
                htmlFor="productBrand"
                required
                widthFull
                onChange={handleProduct}
                value={productDataForm?.brand}
              />
              <fieldset className="flex gap-6">
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
              <TextArea
                text="Descrição:"
                name="description"
                htmlFor="productDescription"
                required
                widthFull
                onChange={handleProduct}
                value={productDataForm?.description}
              />
              <Input
                text="Fotos:"
                name="mainImg"
                type="file"
                htmlFor="productMainImg"
                widthFull
                onChange={handleProduct}
                value={productDataForm?.mainImg}
                reference={inputFileRef}
                accept="image/x-png,image/gif,image/jpeg"
              />
              {editMode && (
                <Button
                  primary
                  text="Upload"
                  widthFull={isMobile}
                  onClick={() => {
                    currentProduct?.id && uploadFile(currentProduct?.id)
                  }}
                />
              )}

              {editMode && (
                <div className="flex gap-2">
                  {currentProduct &&
                    currentProduct.images?.map((image, index) => (
                      <Image
                        key={index}
                        src={image.toString()}
                        width={80}
                        height={80}
                        className={`
                          rounded-sm object-cover
                          ${
                            image === currentProduct.mainImg &&
                            'border-4 border-primary'
                          }
                        `}
                        onClick={() => handleChangeMainImg(image.toString())}
                      />
                    ))}
                </div>
              )}

              <div className="flex justify-center flex-wrap gap-4 flex-1">
                <Button
                  primary
                  text={editMode ? 'Editar' : 'Cadastrar'}
                  widthFull={isMobile}
                />
              </div>
            </form>
          </Modal>
        )}

        {modalStatus === 'confirmationModal' && (
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
                  getProducts()
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
        )}
      </section>
    </>
  )
}

export default Admin
