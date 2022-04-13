import { MdLockOutline } from 'react-icons/md'
import { useGlobalContext } from '../../../contexts/GlobalContext'
import { useLoginContext } from '../../../contexts/LoginContext'
import Button from '../../Button'
import Input from '../../Input'

const LoginForm = () => {
  const { handleLoginInput, login, signInWithGoogle, setModalStatus } =
    useLoginContext()
  const { isMobile } = useGlobalContext()

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="m-auto flex flex-col gap-6 w-full md:w-80"
    >
      <Input
        text="E-mail:"
        type="email"
        name="email"
        htmlFor="loginUserEmail"
        required
        widthFull
        onChange={handleLoginInput}
      />
      <Input
        text="Senha:"
        type="password"
        name="password"
        htmlFor="loginUserPassword"
        icon={<MdLockOutline />}
        required
        widthFull
        onChange={handleLoginInput}
      />
      <div className="flex justify-between flex-wrap gap-6">
        <Button
          primary
          text="Confirmar"
          type="submit"
          widthFull={isMobile}
          onClick={login}
        />
        <Button
          secondary
          google
          text="Entrar com o Google"
          widthFull={isMobile}
          onClick={signInWithGoogle}
        />
        <p className="flex-grow text-xs">
          Esqueceu a senha? Clique
          <span
            className="text-primary font-semibold cursor-pointer"
            onClick={() => {
              setModalStatus('forgotPasswordModal')
            }}
          >
            {' '}
            aqui
          </span>
        </p>
      </div>
    </form>
  )
}

export default LoginForm
