interface ImagesListProps {
  images?: string[]
  activeImage?: string
  setActiveImage: (image: string) => void
  name?: string
}

const ImagesList = ({
  images,
  activeImage,
  setActiveImage,
  name
}: ImagesListProps) => {
  if (!images || images.length === 0) return null
  return (
    <ul className="flex lg:flex-col gap-2">
      {images.map((image, idx) => (
        <li key={idx}>
          <div
            style={{ background: `no-repeat center/cover url(${image})` }}
            role={`Image: ${name}. Image by Unspash`}
            className={` w-16 h-16 lg:w-20 lg:h-20 rounded-sm shadow-lg cursor-pointer
              ${activeImage === image && 'border-4 border-red-400'}
            `}
            onClick={() => setActiveImage(image)}
          ></div>
        </li>
      ))}
    </ul>
  )
}

export default ImagesList
