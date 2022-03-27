import Link from 'next/link'
import {
  MdLogout,
  MdNoAccounts,
  MdOutlineAdminPanelSettings
} from 'react-icons/md'
import { useAuthContext } from '../../contexts/AuthContext'
import { useUserContext } from '../../contexts/UserContext'
import Button from '../Button'
import UserOption from './UserOption'

const UserOptions = () => {
  const { logout } = useAuthContext()
  const { currentUser } = useUserContext()

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
