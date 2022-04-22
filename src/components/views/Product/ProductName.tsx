interface ProductNameProps {
  name?: string
}

const ProductName = ({ name }: ProductNameProps) => {
  if (!name) return null
  return (
    <h1 className="font-semibold text-dark text-5xl 2xl:text-6xl tracking-tight my-2 lg:my-4">
      {name}
    </h1>
  )
}

export default ProductName
