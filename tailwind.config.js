/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        panduit: {
          50: '#f0fdf9',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#00A3AD', // Panduit Official Teal/Green
          600: '#008b94',
          700: '#007077',
          800: '#00595e',
          900: '#083337',
          dark: '#0B0F19',
          card: '#F4F4F6',
          cardHover: '#ECECEF',
        },
        iamet: {
          blue: '#0284c7',
          darkBlue: '#034ea2',
          accent: '#00A3AD',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.03), 0 10px 30px rgba(0, 0, 0, 0.04)',
        'card': '0 10px 40px -10px rgba(0,0,0,0.06)',
        'card-hover': '0 20px 50px -10px rgba(0, 163, 173, 0.15)',
        'pill': '0 4px 14px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
