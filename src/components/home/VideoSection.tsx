import Heading from '../Heading'
import Logo from '../Logo'

const VideoSection = () => {
  const twVideoMeasures = 'h-[80vh] w-full'

  const handleScroll = () => {
    window.scrollTo({ top: 600, behavior: 'smooth' })
  }

  return (
    <div className={`${twVideoMeasures} overflow-hidden relative top-[68px]`}>
      <div className={`${twVideoMeasures} absolute bg-black opacity-60`}></div>
      <div
        className={`
        ${twVideoMeasures} flex flex-col justify-center items-center gap-8 absolute z-10
        font-primary font-semibold text-white uppercase
      `}
      >
        <div className="hidden lg:block">
          <Heading text="Sua jornada começa aqui" inverse />
        </div>
        <div className="lg:hidden">
          <Heading text="Sua jornada" inverse />
          <Heading text="começa aqui" inverse />
        </div>
        <Logo width={300} height={100} fill="#fff" />
        <div
          className="border border-white rounded-sm px-6 py-3 cursor-pointer"
          onClick={handleScroll}
        >
          Ver ofertas
        </div>
      </div>
      <video
        loop
        muted
        autoPlay
        src="/video-home-desktop.mp4"
        className={`${twVideoMeasures} object-cover object-top`}
      />
    </div>
  )
}

export default VideoSection
