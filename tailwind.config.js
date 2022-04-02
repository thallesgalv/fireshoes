module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  media: false,
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter']
      },
      colors: {
        primary: '#F63C3C',
        analogus: '#F6993C',
        dark: '#310c0c'
      },
      keyframes: {
        show: {
          '0%': { transform: 'translate3d(0,-3rem,0)', opacity: '0' }
        },
        showreverse: {
          '0%': { transform: 'translate3d(0,1rem,0)', opacity: '0' }
        },
        in: {
          '0%': { transform: 'translate3d(10rem,0,0)', opacity: '0' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' }
        }
      },
      animation: {
        show: 'show 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        scaleFromTop: 'show 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
        showreverse: 'showreverse 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        in: 'in 0.3s ease-in-out',
        marquee: 'marquee 30s linear infinite',
        marquee2: 'marquee2 30s linear infinite'
      }
    }
  },
  variants: {
    extend: {},
    plugins: []
  }
}
