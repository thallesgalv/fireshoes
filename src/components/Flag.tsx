import { getDiscount } from '../utils/calculations'

interface FlagProps {
  price?: number
  bestPrice?: number
  productId?: string
}

const Flag = ({ price, bestPrice, productId }: FlagProps) => {
  if (!bestPrice || !price || bestPrice >= price) return null
  return (
    <div className="absolute -right-6 -top-8 flex justify-center items-center z-10">
      <p className="absolute text-white font-primary font-semibold tracking-tighter text-xs mt-4">
        {getDiscount(bestPrice, price)}% off
      </p>
      <div className="text-primary">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 1024 1024"
          height="75"
          width="75"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id={`${productId}gradient`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: '#F6993C', stopOpacity: 1 }}
              />
              <stop
                offset={`${100 - getDiscount(bestPrice, price)}%`}
                style={{ stopColor: '#F63C3C', stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <path
            d="M834.1 469.2A347.49 347.49 0 0 0 751.2 354l-29.1-26.7a8.09 8.09 0 0 0-13 3.3l-13 37.3c-8.1 23.4-23 47.3-44.1 70.8-1.4 1.5-3 1.9-4.1 2-1.1.1-2.8-.1-4.3-1.5-1.4-1.2-2.1-3-2-4.8 3.7-60.2-14.3-128.1-53.7-202C555.3 171 510 123.1 453.4 89.7l-41.3-24.3c-5.4-3.2-12.3 1-12 7.3l2.2 48c1.5 32.8-2.3 61.8-11.3 85.9-11 29.5-26.8 56.9-47 81.5a295.64 295.64 0 0 1-47.5 46.1 352.6 352.6 0 0 0-100.3 121.5A347.75 347.75 0 0 0 160 610c0 47.2 9.3 92.9 27.7 136a349.4 349.4 0 0 0 75.5 110.9c32.4 32 70 57.2 111.9 74.7C418.5 949.8 464.5 959 512 959s93.5-9.2 136.9-27.3A348.6 348.6 0 0 0 760.8 857c32.4-32 57.8-69.4 75.5-110.9a344.2 344.2 0 0 0 27.7-136c0-48.8-10-96.2-29.9-140.9z"
            fill={`url(#${productId ? productId : 'noUid'}gradient)`}
          ></path>
        </svg>
      </div>
    </div>
  )
}

export default Flag
