import { useState } from 'react'

interface ZoomOnHoverProps {
  imageSrc: string
  imageName: string
}

const ZoomOnHover = ({ imageSrc, imageName }: ZoomOnHoverProps) => {
  const [transform, setTransform] = useState('')
  const [transformOrigin, setTransformOrigin] = useState('center center')

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let div = e.target as HTMLDivElement
    let posX = e.clientX - div.offsetLeft
    let posY = e.clientY - div.offsetTop

    setTransformOrigin(`${posX}px ${posY}px`)
    setTransform('scale(2)')
  }
  const handleMouseLeave = () => {
    setTransformOrigin('center')
    setTransform('scale(1)')
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
      w-full h-min max-h-[50vh] lg:max-h-[70vh] lg:max-w-2xl
      overflow-hidden hover:cursor-zoom-in
      rounded-sm shadow-lg
      "
    >
      <div
        style={{
          transformOrigin: transformOrigin,
          transform: transform,
          transition: 'transform 0.3s ease-out',
          background: `no-repeat center/cover url(${imageSrc})`
        }}
        className="object-contain origin-center rounded-sm shadow-lg w-full h-96 md:h-[32rem] lg:w-[32rem] xl:w-[34rem] xl:h-[34rem]"
        role={`${imageName}. Image by Unspash`}
      />
    </div>
  )
}

export default ZoomOnHover

// className="object-cover rounded-sm shadow-lg cursor-pointer"
