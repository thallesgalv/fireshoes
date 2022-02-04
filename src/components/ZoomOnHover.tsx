import { useState } from 'react'

interface ZoomOnHoverProps {
  imageSrc: string
  imageName: string
}

const ZoomOnHover = ({ imageSrc, imageName }: ZoomOnHoverProps) => {
  const [transform, setTransform] = useState('')
  const [transformOrigin, setTransformOrigin] = useState('center center')

  const handleMouseMove = (e: any) => {
    let posX = e.clientX - e.target.offsetLeft
    let posY = e.clientY - e.target.offsetTop

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
      w-full h-full max-h-[50vh] lg:max-h-[70vh] lg:max-w-2xl
      overflow-hidden hover:cursor-zoom-in
      "
    >
      <img
        src={imageSrc}
        style={{
          transformOrigin: transformOrigin,
          transform: transform,
          transition: 'transform 0.3s ease-out'
        }}
        className="w-full h-full object-cover origin-center"
        role={`Image: ${imageName}. Image by Unspash`}
      />
    </div>
  )
}

export default ZoomOnHover
// self-baseline
