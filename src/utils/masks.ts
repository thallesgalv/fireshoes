import { FormEvent } from 'react'

export const postalCodeMask = (e: FormEvent<HTMLInputElement>) => {
  let value = e.currentTarget.value
  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{5})(\d)/, '$1-$2')
  e.currentTarget.value = value
  return e
}
