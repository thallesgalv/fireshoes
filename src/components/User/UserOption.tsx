import {
  UserOptionType,
  useUserOptionContext
} from '../../contexts/UserOptionContext'

interface UserOptionProps {
  text: string
  option: UserOptionType
}

const UserOption = ({ text, option }: UserOptionProps) => {
  const { userOption, setUserOption } = useUserOptionContext()
  return (
    <p
      className={`font-primary text-lg font-semibold ${
        userOption === option ? 'text-primary' : 'cursor-pointer text-gray-400'
      }`}
      onClick={() => userOption !== option && setUserOption(option)}
    >
      {text}
    </p>
  )
}

export default UserOption
