import { MdLockOutline } from 'react-icons/md'
import { useGlobalContext } from '../../contexts/GlobalContext'
import { useLoginContext } from '../../contexts/LoginContext'
import Button from '../Button'
import Heading from '../Heading'
import Input from '../Input'
import Modal from '../Modal'

const CreateAccountModal = () => {
  const { modalStatus, setModalStatus, handleCreateUserInput, signUp } =
    useLoginContext()
  const { isMobile } = useGlobalContext()

  return (
    <Modal modalStatus={modalStatus} setModalStatus={setModalStatus}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="m-auto flex flex-col gap-6 w-full md:w-80"
      >
        <Heading text="Crie sua conta" small center />
        <Input
          text="Nome completo:"
          name="name"
          htmlFor="createUserName"
          required
          widthFull
          onChange={handleCreateUserInput}
        />
        <Input
          text="E-mail:"
          type="email"
          name="email"
          htmlFor="createUserEmail"
          required
          widthFull
          onChange={handleCreateUserInput}
        />
        <Input
          text="Senha:"
          type="password"
          name="password"
          htmlFor="createUserPassword"
          icon={<MdLockOutline />}
          required
          widthFull
          onChange={handleCreateUserInput}
        />
        <Input
          text="Confirmar senha:"
          type="password"
          name="passwordConfirmed"
          htmlFor="createUserPasswordConfirmed"
          icon={<MdLockOutline />}
          required
          widthFull
          onChange={handleCreateUserInput}
        />
        <div className="flex justify-center flex-wrap gap-4 flex-1">
          <Button
            primary
            text="Criar conta agora"
            widthFull={isMobile}
            onClick={signUp}
          />
        </div>
      </form>
    </Modal>
  )
}

export default CreateAccountModal
