import Image from 'next/image'

interface VerticalBannerProps {
  img: string
  active: boolean
}

const VerticalBanner = ({ img, active }: VerticalBannerProps) => {
  return (
    <div
      className={`${active ? 'scale-90 grayscale' : ''} hover:scale-105`}
      style={{ transition: 'all 0.3s cubic-bezier(0.2, 1, 0.2, 1.4)' }}
    >
      <Image
        src={img}
        alt="Banner Vertical. Imagem by Unsplash"
        width={475}
        height={712}
        loading="lazy"
      />
    </div>
  )
}

export default VerticalBanner
