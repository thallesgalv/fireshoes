import Link from 'next/link'
import { useState } from 'react'
import VerticalBanner from '../VerticalBanner'

type BannerType = 'casual' | 'esportivo' | null

const CategoriesBanners = () => {
  const [bannerActive, setBannerActive] = useState<BannerType>(null)

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-8 my-16">
      <Link href="/category/esportivo">
        <a
          onMouseEnter={() => setBannerActive('esportivo')}
          onMouseLeave={() => setBannerActive(null)}
        >
          <VerticalBanner
            img="/banner-esportivo.png"
            active={bannerActive === 'casual'}
          />
        </a>
      </Link>
      <Link href="/category/casual">
        <a
          onMouseEnter={() => setBannerActive('casual')}
          onMouseLeave={() => setBannerActive(null)}
        >
          <VerticalBanner
            img="/banner-casual.png"
            active={bannerActive === 'esportivo'}
          />
        </a>
      </Link>
    </div>
  )
}

export default CategoriesBanners
