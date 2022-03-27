import { useLoginContext } from '../../contexts/LoginContext'
import Button from '../Button'
import Heading from '../Heading'
import CreateAccountModal from './CreateAccountModal'
import ForgotPasswordModal from './ForgotPasswordModal'
import LoginForm from './LoginForm'

const LoginInterface = () => {
  const { modalStatus, setModalStatus } = useLoginContext()

  return (
    <>
      <section className="w-11/12 lg:w-full m-auto">
        <Heading text="Login" center />
        <LoginForm />
      </section>
      <section className="mt-14">
        <Heading text="Criar conta" center />
        <div
          className="flex justify-center w-full mt-6"
          onClick={() => {
            setModalStatus('createAccountModal')
          }}
        >
          <Button primary text="Criar agora" />
        </div>
      </section>

      {modalStatus === 'createAccountModal' && <CreateAccountModal />}

      {modalStatus === 'forgotPasswordModal' && <ForgotPasswordModal />}
    </>
  )
}

export default LoginInterface
