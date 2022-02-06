import Image from 'next/image'
import { Order } from '../contexts/UserContext'
import { currency } from '../utils/calculations'
import { formatDate } from '../utils/formatDate'

const OrderResume = ({
  products,
  totalValue,
  adress,
  adressList,
  selectedAdress,
  paymentMethod,
  paymentMethodList,
  selectedPaymentMethod,
  timestamp
}: Order) => {
  const adressObject =
    adress ||
    (adressList &&
      typeof selectedAdress === 'number' &&
      adressList[selectedAdress])

  const paymentMethodObject =
    paymentMethod ||
    (paymentMethodList &&
      typeof selectedPaymentMethod === 'number' &&
      paymentMethodList[selectedPaymentMethod])

  return (
    <div className="md:w-96 m-auto flex flex-col gap-4">
      {timestamp && (
        <h1 className="font-semibold text-lg lg:text-xl">
          {formatDate(timestamp.toMillis())}
        </h1>
      )}

      <ul className="flex flex-col gap-4">
        {products &&
          products?.map(
            ({
              quantity,
              name,
              mainImg,
              price,
              bestPrice,
              id,
              selectedSize
            }) => (
              <li className="flex gap-4" key={id}>
                <Image
                  width={96}
                  height={80}
                  src={mainImg || ''}
                  alt={`${name}. Image by Unspash`}
                  className="rounded-sm shadow-lg object-cover"
                />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-sm font-primary uppercase text-dark">
                    {name}
                  </p>
                  <p className="text-sm font-primary uppercase tracking-tighter">
                    <strong>
                      {price && bestPrice && bestPrice <= price
                        ? currency(bestPrice)
                        : currency(price)}
                    </strong>
                    <span className="text-dark lowercase"> un.</span>
                  </p>
                  <div className="flex gap-1 items-center">
                    <p className="text-xs border border-black text-dark rounded-full w-5 h-5 flex justify-center items-center">
                      {quantity}x
                    </p>
                    <p className="text-xs border border-black text-dark rounded-full w-5 h-5 flex justify-center items-center">
                      {selectedSize}
                    </p>
                    <p className="font-semibold text-primary text-sm font-primary tracking-tighter">
                      Total:{'  '}
                      {price && bestPrice && bestPrice <= price
                        ? currency(bestPrice * quantity)
                        : currency(price && price * quantity)}
                    </p>
                  </div>
                </div>
              </li>
            )
          )}
      </ul>

      <p className="text-lg font-semibold text-right text-dark">
        Subtotal: {currency(totalValue)}
      </p>

      <div className="md:flex justify-between">
        {adressObject && (
          <div>
            <p className="text-sm font-primary tracking-tighter text-primary font-semibold">
              Endereço de Entrega:
            </p>
            <p className="text-sm font-primary tracking-tighter text-dark">
              {adressObject.street}, {adressObject.number}
              {adressObject.complement && `, ${adressObject.complement}`}
            </p>
            <p className="text-sm font-primary tracking-tighter text-dark">
              {adressObject.neighborhood}
            </p>
            <p className="text-sm font-primary tracking-tighter text-dark">
              {adressObject.city}/{adressObject.state}
            </p>
            <p>{adressObject.postalCode}</p>
          </div>
        )}

        {paymentMethodObject && (
          <div className="mt-4 md:text-right md:mt-0">
            <p className="text-sm font-primary tracking-tighter text-primary font-semibold">
              Meio de pagamento:
            </p>
            <p className="text-sm font-primary tracking-tighter text-dark">
              {paymentMethodObject.alias} ••••
              {paymentMethodObject.cardNumber?.slice(-4)}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderResume
