/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        hindi: {
          saffron: '#FF7722',
          gold: '#FFB800',
          indigo: '#4F46E5',
          navy: '#0F172A',
          emerald: '#10B981',
          rose: '#F43F5E',
          cyan: '#06B6D4',
          violet: '#8B5CF6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        hindi: ['Devanagari', 'Noto Sans Devanagari', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(-3%)' },
          '50%': { transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(255, 119, 34, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(255, 119, 34, 0.7)' },
        },
      },
    },
  },
  plugins: [],
}
