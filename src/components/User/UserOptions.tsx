import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import {
  MdLogout,
  MdNoAccounts,
  MdOutlineAdminPanelSettings
} from 'react-icons/md'
import { User, useUserContext } from '../../contexts/UserContext'
import { auth } from '../../firebase/auth'
import Button from '../Button'
import UserOption from './UserOption'
const getFirebase = () => import('../../firebase/auth')

const UserOptions = () => {
  // const { logout } = useAuthContext()
  const { currentUser, setCurrentUser } = useUserContext()
  const router = useRouter()

  const logout = async () => {
    const { signOut } = await getFirebase()

    await signOut(auth)
    toast.success('Logout realizado com sucesso')
    setCurrentUser({} as User)
    router.push('/')
  }

  return (
    <aside className="flex flex-col gap-6 lg:fixed">
      <UserOption text="Endereço de Entrega" option="adress" />
      <UserOption text="Meios de pagamento" option="payment" />
      <UserOption text="Compras Realizadas" option="orderHistory" />
      <div>
        <Button
          primary
          text="Fazer logout"
          icon={<MdLogout />}
          onClick={logout}
        />
      </div>
      <div>
        <Button
          secondary
          text="Deletar conta"
          icon={<MdNoAccounts />}
          onClick={logout}
        />
      </div>
      {currentUser?.isAdmin && (
        <Link href="/admin">
          <a>
            <Button
              primary
              text="Administrador"
              icon={<MdOutlineAdminPanelSettings />}
            />
          </a>
        </Link>
      )}
    </aside>
  )
}

export default UserOptions
