/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        "discord-gray": "#2f3136",
        "discord-blue": "#5865F2",
        "stardew-beige": "#FFE0B0"
      },
      animation: {
        'reverse-spin': 'reverse-spin 1s linear infinite'
      },
      keyframes: {
        'reverse-spin': {
          from: {
            transform: 'rotate(360deg)'
          },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

