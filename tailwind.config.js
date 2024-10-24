/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'crocogol-green': {
          DEFAULT: '#004d00',
          '50': '#e6ffe6',
          '100': '#ccffcc',
          '200': '#99ff99',
          '300': '#66ff66',
          '400': '#33ff33',
          '500': '#00ff00',
          '600': '#00cc00',
          '700': '#009900',
          '800': '#006600',
          '900': '#003300',
        },
      },
      fontFamily: {
        'retro': ['Roboto Slab', 'serif'],
      },
    },
  },
  plugins: [],
}