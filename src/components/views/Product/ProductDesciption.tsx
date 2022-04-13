interface ProductDesciptionProps {
  description?: string
}

const ProductDesciption = ({ description }: ProductDesciptionProps) => {
  // if (!description) return null
  return (
    <h2 className="lg:max-w-xs my-6 lg:my-4">
      {description ||
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel numquamvoluptatibus eaque, quam ipsa cum sapiente similique asperiores, aperiam, pariatur odit dolores repudiandae quos dolorum busdam molestiae fuga officia'}
    </h2>
  )
}

export default ProductDesciption
