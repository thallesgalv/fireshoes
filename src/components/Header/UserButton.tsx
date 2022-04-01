import Link from 'next/link'
import { MdLogin, MdPerson } from 'react-icons/md'
import { useHeaderContext } from '../../contexts/HeaderContext'
import { useUserContext } from '../../contexts/UserContext'
import { auth } from '../../firebase/auth'
import Button from '../Button'

const UserButton = () => {
  const { currentUser } = useUserContext()
  const { handleMenu } = useHeaderContext()

  return (
    <Link href={auth.currentUser && auth.currentUser?.uid ? '/user' : '/login'}>
      <a onClick={handleMenu}>
        <div>
          {auth.currentUser && auth.currentUser?.uid ? (
            <Button
              primary
              text={currentUser?.name}
              icon={!currentUser?.photo && <MdPerson />}
              userPhoto={currentUser?.photo}
            />
          ) : (
            <Button primary text={`Fazer Login`} icon={<MdLogin />} />
          )}
        </div>
      </a>
    </Link>
  )
}

export default UserButton
