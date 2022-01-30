import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { db } from '../../services/firebase'
import { parseToJson } from '../../utils/getProductsByQuery'

const Product = (props: any) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <section>
      <h1>Nome: {props.name}</h1>
    </section>
  )
}

export default Product

export const getStaticProps = async () => {
  const docRef = doc(db, 'products', 'kTbm1e68XhVeQpl2agpX')
  const docSnap = await getDoc(docRef)
  const product = parseToJson(docSnap)

  return {
    props: { product }
  }
}
