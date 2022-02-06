import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MdDeleteOutline, MdOutlineEdit, MdNotInterested } from 'react-icons/md'
import { FormEvent, useCallback, useEffect, useState } from 'react'
import { useGlobalContext } from '../contexts/GlobalContext'
import { useUserContext } from '../contexts/UserContext'
import { Product, useProductContext } from '../contexts/ProductContext'
import Modal, { ModalStatus } from '../components/Modal'
import Button from '../components/Button'
import Heading from '../components/Heading'
import Input from '../components/Input'
import TextArea from '../components/TextArea'
import { currency } from '../utils/calculations'
import { normalizeString } from '../utils/normalizeString'

const Admin: NextPage = () => {
  const [modalStatus, setModalStatus] = useState<ModalStatus>(null)
  const [editMode, setEditMode] = useState(false)
  const [currentColor, setCurrentColor] = useState('')
  const [currentSize, setCurrentSize] = useState('')
  const { isMobile } = useGlobalContext()
  const { currentUser } = useUserContext()
  const router = useRouter()

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
    if (!currentUser?.isAdmin) router.push('/')
    getProducts()
  }, [])

  useEffect(() => {
    setProductDataForm({
      id: currentProduct?.id,
      name: currentProduct?.name,
      brand: currentProduct?.brand,
      price: currentProduct?.price,
      bestPrice: currentProduct?.bestPrice,
      description: currentProduct?.description,
      colors: currentProduct?.colors
    })
  }, [currentProduct])

  useEffect(() => {
    setProductDataForm({} as Product)
    setCurrentColor('')
    setCurrentProduct(undefined)
  }, [modalStatus])

  const handleProduct = useCallback(
    (e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => {
      setProductDataForm({
        ...productDataForm,
        [e.currentTarget.name]: e.currentTarget.value
      })
    },
    [productDataForm]
  )

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

  if (!currentUser?.isAdmin) return null

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
                      Cores
                    </th>
                    <th className="text-center p-2 border border-white">
                      Foto Principal
                    </th>
                    <th className="text-center p-2 border border-white">
                      Tamanhos
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
                    ({
                      id,
                      name,
                      brand,
                      price,
                      bestPrice,
                      mainImg,
                      colors,
                      sizes
                    }) => (
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
                        <td className="border border-primary p-2 text-center text-dark">
                          {id}
                        </td>
                        <td className="border border-primary p-2 text-center text-dark">
                          <Link
                            href={`/product/${normalizeString(name)}/${id}`}
                          >
                            <a>Link</a>
                          </Link>
                        </td>
                        <td className="border border-primary p-2 text-center text-dark">
                          {brand}
                        </td>
                        <td className="border border-primary p-2 text-center text-dark">
                          {name}
                        </td>
                        <td className="border border-primary p-2 text-center text-dark">
                          {colors?.join(', ') || ''}
                        </td>
                        <td className="flex justify-center p-2 text-center">
                          <Image
                            src={mainImg || ''}
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        </td>
                        <td className="border border-primary p-2 text-center text-dark">
                          {sizes?.join(', ') || ''}
                        </td>
                        <td className="border border-primary p-2 text-center text-dark">
                          {currency(price)}
                        </td>
                        <td className="border border-primary p-2 text-center text-dark">
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
          <Modal
            widthFit
            modalStatus={modalStatus}
            setModalStatus={setModalStatus}
          >
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
                  <Input
                    text="Marca:"
                    name="brand"
                    htmlFor="productBrand"
                    required
                    widthFull
                    onChange={handleProduct}
                    value={productDataForm?.brand}
                  />
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
                          <div className="flex">
                            <div key={idx}>{color} </div>
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
                    accept="image/x-png,image/gif,image/jpeg"
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
                            onClick={() =>
                              handleChangeMainImg(image.toString())
                            }
                          ></div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
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
                          <div className="flex">
                            <div key={idx}>{size} </div>
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
              </div>

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
