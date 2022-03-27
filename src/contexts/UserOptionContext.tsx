import { createContext, ReactNode, useContext, useState } from 'react'

interface UserOptionContextProviderProps {
  children: ReactNode
}

interface UserOptionContextProps {
  userOption: UserOptionType
  setUserOption: (state: UserOptionType) => void
}

const UserOptionContext = createContext({} as UserOptionContextProps)

export type UserOptionType = 'adress' | 'payment' | 'orderHistory'

export const UserOptionContextProvider = ({
  children
}: UserOptionContextProviderProps) => {
  const [userOption, setUserOption] = useState<UserOptionType>('adress')

  return (
    <UserOptionContext.Provider
      value={{
        userOption,
        setUserOption
      }}
    >
      {children}
    </UserOptionContext.Provider>
  )
}

export const useUserOptionContext = () => useContext(UserOptionContext)
