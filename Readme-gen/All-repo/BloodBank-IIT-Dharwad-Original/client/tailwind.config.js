/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      colors: {
        cream: "#FFFDD0",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        bloodsphere: {
          "primary": "#dc2626",
          "secondary": "#1e293b",
          "accent": "#ef4444",
          "neutral": "#020617",
          "base-100": "#020617",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87171",
        },
      },
    ],
  },
};