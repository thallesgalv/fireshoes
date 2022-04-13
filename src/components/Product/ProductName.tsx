interface ProductNameProps {
  name?: string
}

const ProductName = ({ name }: ProductNameProps) => {
  if (!name) return null
  return (
    <h1 className="text-dark font-semibold text-6xl my-2 lg:my-4">{name}</h1>
  )
}

export default ProductName
