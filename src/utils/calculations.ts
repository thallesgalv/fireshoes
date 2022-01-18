export const currency = (number?: number) => {
  if (number) {
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }
}

export const getDiscount = (bestPrice?: number, price?: number) => {
  if (bestPrice && price) {
    return Math.round(((price - bestPrice) / price) * 100) + '%'
  }
}
