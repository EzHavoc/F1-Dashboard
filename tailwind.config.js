/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neo-black': '#0A0A0A',
        'neo-purple': '#C4B5FD',
        'neo-pink': '#FDA4AF',
        'neo-blue': '#93C5FD',
        'neo-green': '#86EFAC',
        'neo-yellow': '#FDE68A',
        'neo-orange': '#FDBA74',
        'neo-gray': '#1F1F1F',
        'neo-white': '#F8FAFC',
      },
      boxShadow: {
        'neo': '4px 4px 0 0',
        'neo-lg': '8px 8px 0 0',
      },
      fontFamily: {
        'display': ['system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'superwide': '0.25em',
      },
    },
  },
  plugins: [],
};