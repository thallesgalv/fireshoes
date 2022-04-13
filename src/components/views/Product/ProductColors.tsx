interface ProductColorsProps {
  colors?: string[]
}

const ProductColors = ({ colors }: ProductColorsProps) => {
  if (!colors || colors.length === 0) return null
  return (
    <p className="mt-4">
      {colors.length > 1 ? 'Cores: ' : 'Cor: '}
      {colors.join(', ')}
    </p>
  )
}

export default ProductColors
