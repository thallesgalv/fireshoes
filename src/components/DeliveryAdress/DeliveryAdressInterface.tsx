import { AdressContextProvider } from '../../contexts/AdressContext'
import DeliveryAdress from './DeliveryAdress'

interface DeliveryAdressInterfaceProps {
  orientation: 'horizontal' | 'vertical'
}

const DeliveryAdressInterface = ({
  orientation
}: DeliveryAdressInterfaceProps) => {
  return (
    <AdressContextProvider>
      <DeliveryAdress orientation={orientation} />
    </AdressContextProvider>
  )
}

export default DeliveryAdressInterface
