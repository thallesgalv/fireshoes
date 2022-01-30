import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next/types'
import { db } from '../../services/firebase'
import { parseToJson } from '../../utils/getProductsByQuery'

const Product = ({ product }: any) => {
  const router = useRouter()
  const { slug } = router.query
  const { name, mainImg } = product

  return (
    <section>
      <p>Slug: {slug}</p>
      <p>Nome: {name}</p>
      <img src={mainImg} alt={name} />
    </section>
  )
}

export default Product

interface PathProps {
  params: { id: string; slug: string }
}

export const getStaticProps = async (props: PathProps) => {
  const docRef = doc(db, 'products', props.params.slug)
  const docSnap = await getDoc(docRef)
  const productData = parseToJson(docSnap)

  return {
    props: { product: productData },
    revalidate: 5000
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const productsCollectionRef = collection(db, 'products')
  const querySnapshot = await getDocs(productsCollectionRef)

  const paths = querySnapshot.docs.map((doc) => {
    const id = doc.id
    const slug = doc.id
    return {
      params: { id, slug }
    }
  })

  return { paths, fallback: false }
}
