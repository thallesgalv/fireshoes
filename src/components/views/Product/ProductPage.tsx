import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCartContext } from '../../../contexts/CartContext'
import { Product } from '../../../types/interfaces'
import Button from '../../Button'
import ZoomOnHover from '../../ZoomOnHover'
import ImagesList from './ImagesList'
import ProductInfo from './ProductInfo'

interface ProductPageProps {
  product: Product
}

const ProductPage = ({ product }: ProductPageProps) => {
  const [activeImage, setActiveImage] = useState(product.mainImg)

  const { addToCart, selectedSize } = useCartContext()

  useEffect(() => {
    setActiveImage(product.mainImg)
  }, [product])

  const handleProduct = (product?: Product) => {
    if (product) {
      addToCart({ ...product, quantity: 1, selectedSize: selectedSize })
    }
  }

  return (
    <section className="mx-auto w-11/12 lg:w-full">
      <article className="lg:flex justify-center gap-16 lg:gap-8 2xl:gap-16 mx-auto lg:mt-8 lg:mb-24">
        <div className="flex flex-col-reverse gap-4 lg:flex-row lg:gap-8">
          <ImagesList
            images={product.images}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
            name={product.name}
          />
          <div>
            {activeImage && (
              <ZoomOnHover
                imageSrc={activeImage}
                imageName={product.name || ''}
              />
            )}
          </div>
        </div>
        <div className="relative mt-4 lg:mt-0">
          <ProductInfo product={product} />
          <div className="flex flex-col gap-4 mt-4 w-64 mx-auto lg:m-0">
            <Button
              primary
              widthFull
              text="Adicionar ao carrinho"
              onClick={() => handleProduct(product)}
            />
            <Link href="/checkout">
              <a>
                <Button secondary widthFull text="Finalizar compra" />
              </a>
            </Link>
          </div>
        </div>
      </article>
    </section>
  )
}

export default ProductPage
