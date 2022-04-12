import { FormEvent } from 'react'

export const postalCodeMask = (e: FormEvent<HTMLInputElement>) => {
  let value = e.currentTarget.value
  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{5})(\d)/, '$1-$2')
  e.currentTarget.value = value
  return e
}

export const paymentMethodExpirationDateMask = (e: FormEvent<HTMLInputElement>) => {
  let value = e.currentTarget.value
  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{2})(\d)/, '$1/$2')
  e.currentTarget.value = value
  return e
}

export const paymentMethodSecurityCodeMask = (e: FormEvent<HTMLInputElement>) => {
  let value = e.currentTarget.value
  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{3})(\d)/, '$1/$2')
  e.currentTarget.value = value
  return e
}

export const cardNumberMask = (e: FormEvent<HTMLInputElement>) => {
  let value = e.currentTarget.value
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d{4})(\d)/, '$1 $2')
  value = value.replace(/(\d{4})(\d)/, '$1 $2')
  value = value.replace(/(\d{4})(\d)/, '$1 $2')
  value = value.replace(/(\d{4})(\d)/, '$1 $2')
  e.currentTarget.value = value
  return e
}
