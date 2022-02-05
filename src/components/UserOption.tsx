import { useGlobalContext, UserOption } from '../contexts/GlobalContext'

interface UserOptionProps {
  text: string
  option: UserOption
}

const UserOption = ({ text, option }: UserOptionProps) => {
  const { userOption, setUserOption } = useGlobalContext()

  return (
    <p
      className={`font-primary text-lg font-semibold
               ${
                 userOption === option
                   ? 'text-primary'
                   : 'cursor-pointer text-gray-400'
               }
             `}
      onClick={() => userOption !== option && setUserOption(option)}
    >
      {text}
    </p>
  )
}

export default UserOption
