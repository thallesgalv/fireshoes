import { Timestamp } from '../firebase/firestore'

export interface User {
  uid?: string
  name?: string | undefined | null
  photo?: string | undefined | null
  email?: string | undefined | null
  password?: string | undefined
  passwordConfirmed?: string | undefined
  adressList?: Adress[]
  selectedAdress?: number
  paymentMethodList?: PaymentMethod[]
  selectedPaymentMethod?: number
  orders?: Order[]
  isAdmin?: boolean
}

export interface Adress {
  postalCode?: string
  street?: string
  number?: string
  complement?: string
  neighborhood?: string
  city?: string
  state?: string
}

export interface PaymentMethod {
  alias?: string
  cardNumber?: string
  expirationDate?: string
  securityCode?: string
  cardHolder?: string
}

export interface Product {
  id?: string
  name?: string
  category?: string
  brand?: string
  price?: number
  bestPrice?: number
  images?: string[]
  mainImg?: string
  description?: string
  colors?: string[]
  sizes?: string[]
  timestamp?: string
}

export interface ProductInCart extends Product {
  quantity: number
  selectedSize: string
}

export interface Cart {
  products: ProductInCart[]
  totalValue?: number
}

export interface Order {
  products: ProductInCart[]
  totalValue: number
  adress?: Adress
  adressList?: Adress[]
  selectedAdress?: number
  paymentMethod?: PaymentMethod
  paymentMethodList?: PaymentMethod[]
  selectedPaymentMethod?: number
  timestamp?: Timestamp
}
