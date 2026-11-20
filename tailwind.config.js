/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          plum: '#9E1960',
          deep: '#7E114B',
          rose: '#C14488',
          blush: '#FDF4F8',
          soft: '#F8E3EE',
          sand: '#C6B39A',
          taupe: '#8E7D6B',
          ink: '#231A20',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        arabic: ['"Cairo"', '"IBM Plex Sans Arabic"', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(158, 25, 96, 0.08)',
        'glass-lg': '0 16px 48px rgba(158, 25, 96, 0.12)',
      },
    },
  },
  plugins: [],
};
