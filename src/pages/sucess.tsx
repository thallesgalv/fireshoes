import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Button from '../components/Button'
import Heading from '../components/Heading'
import AnimationCelebration from '../components/Lottie/AnimationCelebration'
import Main from '../components/Main'
import { useGlobalContext } from '../contexts/GlobalContext'

const Sucess = () => {
  const { sucessOrder, isMobile } = useGlobalContext()
  const router = useRouter()

  useEffect(() => {
    if (!sucessOrder) router.push('/')
  }, [])

  if (!sucessOrder) return null

  return (
    <Main>
      <Head>
        <title>Sucesso | Fireshoes 🔥</title>
        <meta name="description" content="Área de Sucesso" />
      </Head>
      <section>
        <Heading text="Pedido confirmado" center small={isMobile} />
        <Link href="/">
          <a className="flex justify-center mt-16">
            <Button primary text="Ir para página inicial" />
          </a>
        </Link>
        <AnimationCelebration />
      </section>
    </Main>
  )
}

export default Sucess
