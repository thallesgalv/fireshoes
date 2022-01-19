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
      fontSize: {
        tiny: '0.625rem'
      },
      colors: {
        primary: '#F63C3C'
      },
      keyframes: {
        show: {
          '0%': { transform: 'translate3d(0,-3rem,0)', opacity: '0' }
        }
      },
      animation: {
        show: 'show 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }
    }
  },
  variants: {
    extend: {},
    plugins: []
  }
}
