import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  getProduct,
  getProductsByQuery
} from '../../../firebase/firebaseRequests'
import { Product } from '../../../contexts/ProductContext'
import { useCartContext } from '../../../contexts/CartContext'
import { currency } from '../../../utils/calculations'
import Button from '../../../components/Button'
import Shelf from '../../../components/Shelf'
import ZoomOnHover from '../../../components/ZoomOnHover'
import Flag from '../../../components/Flag'

interface ProductProps {
  product: Product
  newReleases: Product[]
}

const Product = ({ product, newReleases }: ProductProps) => {
  const {
    id,
    name,
    mainImg,
    price,
    bestPrice,
    images,
    brand,
    description,
    colors,
    sizes
  } = product
  const [activeImage, setActiveImage] = useState(mainImg)
  const { addToCart, selectedSize, setSelectedSize } = useCartContext()

  useEffect(() => {
    setActiveImage(mainImg)
  }, [product])

  const handleProduct = (product?: Product) => {
    if (product) {
      addToCart({ ...product, quantity: 1, selectedSize: selectedSize })
    }
  }
  return (
    <section className="mx-auto w-11/12 lg:w-full">
      <article className="lg:flex justify-center gap-16 mx-auto lg:mt-8 lg:h-[70vh]">
        <div className="flex flex-col-reverse gap-4 lg:flex-row lg:gap-8">
          <ul className="flex lg:flex-col gap-2">
            {images &&
              images?.map((image, idx) => (
                <li key={idx}>
                  <div
                    style={{
                      background: `no-repeat center/cover url(${image})`
                    }}
                    role={`Image: ${name}. Image by Unspash`}
                    className={`w-16 h-16 lg:w-20 lg:h-20 rounded-sm shadow-lg cursor-pointer  ${
                      activeImage === image && 'border-4 border-red-400'
                    }`}
                    onClick={() => setActiveImage(image)}
                  ></div>
                </li>
              ))}
          </ul>
          <div>
            {activeImage && (
              <ZoomOnHover imageSrc={activeImage} imageName={name || ''} />
            )}
          </div>
        </div>
        <div className="relative">
          {/* <Flag price={price} bestPrice={bestPrice} productId={id} /> */}
          <p className="uppercase text-dark">{brand}</p>
          <h1 className="text-dark font-semibold text-6xl">{name}</h1>
          <div>
            {(!bestPrice || (price && bestPrice >= price)) && (
              <p className="text-3xl font-primary uppercase text-dark tracking-tighter my-4">
                <strong className="font-light ">{`${currency(price)}`}</strong>
              </p>
            )}
            {bestPrice && price && bestPrice < price && (
              <p className="font-normal font-primary text-dark tracking-tighter flex flex-col my-4">
                <span className="font-light text-md">
                  de{' '}
                  <span className=" line-through font-light text-md">{`${currency(
                    price
                  )}`}</span>{' '}
                  por
                </span>
                <strong className="font-light text-3xl ">
                  {' '}
                  {`${currency(bestPrice)}`}
                </strong>
              </p>
            )}
          </div>
          {sizes && (
            <div className="flex">
              {sizes.length > 1 ? 'Tamanhos: ' : 'Tamanho: '}
              <div className="flex gap-1 ml-2">
                {sizes.sort().map((size, idx) => (
                  <div
                    key={idx}
                    className={`
                        rounded-full flex justify-center items-center p-1 border border-dark
                        text-xs w-6 h-6 cursor-pointer
                        ${selectedSize === size && 'bg-dark text-white'}
                      `}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
          )}
          {colors && (
            <p>
              {colors.length > 1 ? 'Cores: ' : 'Cor: '}
              {colors.join(', ')}
            </p>
          )}
          <h2 className="lg:max-w-xs my-4">
            {description ||
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel numquamvoluptatibus eaque, quam ipsa cum sapiente similique asperiores, aperiam, pariatur odit dolores repudiandae quos dolorum busdam molestiae fuga officia'}
          </h2>
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

      <div className="mt-4">
        <Shelf titleCenter title="Veja também" data={newReleases} />
      </div>
    </section>
  )
}

export default Product

interface PathProps {
  params: { id: string; slug: string }
}

export const getServerSideProps = async (props: PathProps) => {
  return {
    props: {
      product: await getProduct(props.params.slug),
      newReleases: await getProductsByQuery('where')
    }
  }
}
