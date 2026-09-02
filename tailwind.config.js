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
          saffron: '#F15A24',
          gold: '#FFB800',
          indigo: '#4F46E5',
          navy: '#0F172A',
          emerald: '#10B981',
          rose: '#F43F5E',
          cyan: '#00A8E8',
          violet: '#8B5CF6',
        },
        jethat: {
          orange: '#F15A24',
          saffron: '#E85D26',
          cyan: '#00A8E8',
          teal: '#38B6FF',
          red: '#A91D22',
          navy: '#0F172A',
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
