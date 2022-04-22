import Head from 'next/head'
import Link from 'next/link'
import Button from '../components/Button'
import Animation404 from '../components/Lottie/Animation404'
import Main from '../components/Main'

const Notfound = () => {
  return (
    <Main>
      <Head>
        <title>Página não Encontrada | Fireshoes 🔥</title>
        <meta name="description" content="Fireshoes. Página não encontrada." />
      </Head>
      <section className="flex flex-col justify-center items-center gap-8">
        <div>
          <Animation404 />
          <p className="text-center">Página não encontrada.</p>
        </div>
        <Link href="/">
          <a>
            <Button primary text="Voltar para home" />
          </a>
        </Link>
      </section>
    </Main>
  )
}

export default Notfound
