/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1170px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '960px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '740px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '660px'},
      // => @media (max-width: 639px) { ... }
      'xs': {'max':'380px'}
    },
    extend: {
      colors: {
         bgContainer: "#F1F5F9",
         primary:"#336FF9",
         bgAlert:'#FFF5F5',
         secondary:'#79889D'
      }
    },
  },
  plugins: [],
}