/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B1120',
        card: '#1E293B',
        'card-hover': '#243247',
        primary: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          dark: '#1D4ED8',
          light: '#60A5FA',
        },
        gold: {
          DEFAULT: '#FACC15',
          hover: '#EAB308',
          light: '#FEF08A',
          glow: 'rgba(250, 204, 21, 0.25)',
        },
        slate: {
          850: '#141E33',
          900: '#0B1120',
          950: '#070B16',
        },
        textMuted: '#94A3B8'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.4)',
        'glow-gold': '0 0 25px -5px rgba(250, 204, 21, 0.35)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
