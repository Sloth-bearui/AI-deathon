import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#0B1220',
          raised: '#111A2E',
          surface: '#162033',
          hover: '#1C2A42',
          border: 'rgba(45, 212, 191, 0.15)',
        },
        light: {
          DEFAULT: '#F7F9FC',
          raised: '#FFFFFF',
          surface: '#EDF1F7',
          hover: '#E2E8F0',
          border: 'rgba(15, 23, 42, 0.1)',
        },
        accent: {
          DEFAULT: '#2DD4BF',
          light: '#38BDF8',
          glow: 'rgba(45, 212, 191, 0.2)',
        },
        status: {
          verified: '#34D399',
          caution: '#F59E0B',
          danger: '#F87171',
          info: '#60A5FA',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Atkinson Hyperlegible"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'body': ['1.125rem', { lineHeight: '1.6' }],
      },
      borderRadius: {
        'glass': '20px',
        'card': '16px',
        'button': '12px',
      },
      backdropBlur: {
        'glass': '20px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        'reading': '70ch',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'scan-line': 'scanLine 2s ease-in-out',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'mesh-drift': 'meshDrift 30s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(45, 212, 191, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(45, 212, 191, 0.2)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        meshDrift: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -20px) rotate(120deg)' },
          '66%': { transform: 'translate(-20px, 30px) rotate(240deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
