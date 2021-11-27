module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter']
      },
      colors: {
        primary: '#F63C3C'
      }
    }
  },
  variants: {
    extend: {},
    plugins: []
  }
}
