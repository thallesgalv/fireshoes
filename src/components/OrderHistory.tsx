import { useUserContext } from '../contexts/UserContext'
import OrderResume from './OrderResume'
import AnimationOrder from '../components/Lottie/AnimationOrder'

const OrderHistory = () => {
  const { currentUser } = useUserContext()

  return (
    <div className="flex flex-col gap-6">
      {currentUser?.orders?.length ? (
        currentUser?.orders
          .slice()
          .reverse()
          .map(({ products, totalValue, adress, paymentMethod, timestamp }) => (
            <div className="border-b-2 pb-4">
              <OrderResume
                products={products}
                totalValue={totalValue}
                adress={adress}
                paymentMethod={paymentMethod}
                timestamp={timestamp}
              />
            </div>
          ))
      ) : (
        <div className="flex justify-center items-center flex-col gap-4">
          <AnimationOrder />
          <p className="text-primary text-center">
            Histórico de compras vazio.
          </p>
        </div>
      )}
    </div>
  )
}

export default OrderHistory
