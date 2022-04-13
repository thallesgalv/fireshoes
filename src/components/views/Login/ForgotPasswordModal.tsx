import { useGlobalContext } from '../../../contexts/GlobalContext'
import { useLoginContext } from '../../../contexts/LoginContext'
import Button from '../../Button'
import Heading from '../../Heading'
import Input from '../../Input'
import Modal from '../../Modal'

const ForgotPasswordModal = () => {
  const { modalStatus, setModalStatus, setRecoverUserEmail, forgotPassword } =
    useLoginContext()
  const { isMobile } = useGlobalContext()

  return (
    <Modal modalStatus={modalStatus} setModalStatus={setModalStatus}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="m-auto flex flex-col gap-6 w-full md:w-80"
      >
        <Heading text="Recuperar senha" small center />
        <Input
          text="E-mail:"
          type="email"
          name="recoverUserEmail"
          required
          widthFull
          onChange={(e) => setRecoverUserEmail(e.target.value)}
        />
        <div className="flex justify-center flex-wrap gap-4 flex-1">
          <Button
            primary
            text="Enviar-email"
            widthFull={isMobile}
            onClick={() => {
              forgotPassword()
              setModalStatus(null)
            }}
          />
        </div>
      </form>
    </Modal>
  )
}

export default ForgotPasswordModal
