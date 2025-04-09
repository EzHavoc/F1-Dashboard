/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neo-black': '#171717',
        'neo-purple': '#B4A7D6',
        'neo-pink': '#F4B8E4',
        'neo-blue': '#95C8F4',
        'neo-green': '#A7E8BD',
        'neo-yellow': '#FFE999',
        'neo-orange': '#FFBFA3',
      },
      boxShadow: {
        'neo': '4px 4px 0 0',
      },
    },
  },
  plugins: [],
};