import type { Config } from 'tailwindcss';

/** All colours resolve to CSS variables defined in src/design-system/tokens.css,
 *  so dark and light themes are designed independently (not inverted). */
const v = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: v('bg'),
        raised: v('raised'),
        surface: v('surface'),
        hover: v('hover'),
        ink: { DEFAULT: v('ink'), 2: v('ink-2'), 3: v('ink-3') },
        accent: { DEFAULT: v('accent'), 2: v('accent-2'), ink: v('accent-ink'), on: v('on-accent') },
        ok: { DEFAULT: v('ok'), ink: v('ok-ink') },
        warn: { DEFAULT: v('warn'), ink: v('warn-ink') },
        bad: { DEFAULT: v('bad'), ink: v('bad-ink') },
        line: 'var(--line)',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Atkinson Hyperlegible"', 'system-ui', 'sans-serif'],
      },
      borderRadius: { glass: '20px', card: '16px', btn: '14px' },
      maxWidth: { reading: '70ch' },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        lift: 'var(--shadow-lift)',
        glow: '0 0 0 1px rgb(var(--c-accent) / 0.35), 0 8px 40px -8px rgb(var(--c-accent) / 0.35)',
      },
      keyframes: {
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        scan: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(400%)' } },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(4%,-3%,0) scale(1.08)' },
        },
        pulseRing: { '0%': { boxShadow: '0 0 0 0 rgb(var(--c-accent) / 0.45)' }, '100%': { boxShadow: '0 0 0 14px rgb(var(--c-accent) / 0)' } },
      },
      animation: {
        shimmer: 'shimmer 1.8s ease-in-out infinite',
        scan: 'scan 2.4s ease-in-out infinite',
        drift: 'drift 40s ease-in-out infinite',
        'drift-slow': 'drift 60s ease-in-out infinite reverse',
        'pulse-ring': 'pulseRing 1.6s ease-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
