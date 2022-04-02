interface VerticalBannerProps {
  img: string
  active: boolean
}

const VerticalBanner = ({ img, active }: VerticalBannerProps) => {
  return (
    <img
      src={img}
      alt="Banner Vertical. Imagem by Unsplash"
      className={`${active ? 'scale-90 grayscale' : ''} hover:scale-105`}
      style={{ transition: 'all 0.3s cubic-bezier(0.2, 1, 0.2, 1.4)' }}
    />
  )
}

export default VerticalBanner
