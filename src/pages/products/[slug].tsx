import { getProduct } from '../../utils/firebaseRequests'

const Product = ({ product }: any) => {
  const { name, mainImg, price } = product

  return (
    <section>
      <p>Nome: {name}</p>
      <p>Price: {price}</p>
      <img src={mainImg} alt={name} />
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
      product: await getProduct(props.params.slug)
    }
  }
}
