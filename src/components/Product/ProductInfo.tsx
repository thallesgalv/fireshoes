import { Product } from '../../contexts/ProductContext'
import Breadcumb from './Breadcumb'
import ProductColors from './ProductColors'
import ProductDesciption from './ProductDesciption'
import ProductName from './ProductName'
import ProductPrice from './ProductPrice'
import ProductSizes from './ProductSizes'

interface ProductInfoProps {
  product: Product
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <>
      <Breadcumb category={product.category} brand={product.brand} />
      <ProductName name={product.name} />
      <ProductPrice bestPrice={product.bestPrice} price={product.price} />
      <ProductSizes sizes={product.sizes} />
      <ProductColors colors={product.colors} />
      <ProductDesciption description={product.description} />
    </>
  )
}

export default ProductInfo
