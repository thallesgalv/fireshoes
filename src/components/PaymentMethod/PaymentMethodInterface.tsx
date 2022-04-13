import { PaymentMethodContextProvider } from "../../contexts/PaymentMethodContext"
import PaymentMethod from "./PaymentMethod"

interface PaymentMethodInterfaceProps {
  orientation: 'horizontal' | 'vertical'
}

const PaymentMethodInterface = ({orientation}: PaymentMethodInterfaceProps) => {
  return (
    <PaymentMethodContextProvider>
      <PaymentMethod orientation={orientation} />
    </PaymentMethodContextProvider>
  )
}

export default PaymentMethodInterface
