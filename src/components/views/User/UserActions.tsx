import { useUserOptionContext } from '../../../contexts/UserOptionContext'
import DeliveryAdressInterface from '../../DeliveryAdress/DeliveryAdressInterface'
import OrderHistory from '../../OrderHistory'
import PaymentMethodInterface from '../../PaymentMethod/PaymentMethodInterface'

const UserActions = () => {
  const { userOption } = useUserOptionContext()
  const containerOptionStyle =
    'w-full lg:w-[500px] lg:mx-auto md:flex items-center flex-col '

  return (
    <div className="w-full mt-8 lg:mt-0">
      {userOption === 'adress' && (
        <div className={containerOptionStyle}>
          <DeliveryAdressInterface orientation="vertical" />
        </div>
      )}
      {userOption === 'payment' && (
        <div className={containerOptionStyle}>
          <PaymentMethodInterface orientation="vertical" />
        </div>
      )}
      {userOption === 'orderHistory' && (
        <div
          className={
            containerOptionStyle +
            'h-[58vh] 3xl:h-[70vh] overflow-y-scroll scrollbar'
          }
        >
          <OrderHistory />
        </div>
      )}
    </div>
  )
}

export default UserActions
