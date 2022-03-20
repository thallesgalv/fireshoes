export const checkForPrice = (price?: number, bestPrice?: number) => {
  if (price && bestPrice !== 0) {
    if ((price && !bestPrice) || (bestPrice && price <= bestPrice)) {
      return { price: price }
    }
    if ((!price && bestPrice) || (bestPrice && bestPrice <= price)) {
      return { bestPrice: bestPrice }
    }
    return null
  }
  return null
}
