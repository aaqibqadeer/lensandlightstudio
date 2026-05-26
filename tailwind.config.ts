import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        accent: 'var(--color-accent)',
        muted: 'var(--color-muted)',
      },
      fontFamily: {
        display: ['var(--font-display)', ...fontFamily.serif],
        body: ['var(--font-body)', ...fontFamily.sans],
      },
      fontSize: {
        'display': ['clamp(3rem,10vw,9rem)', { lineHeight: '0.9', letterSpacing: '-0.04em', fontWeight: '700' }],
        'display-md': ['clamp(2rem,5vw,4rem)', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '700' }],
      },
      maxWidth: {
        container: '1440px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        'fade-up': 'fade-up 0.6s ease forwards',
        'slide-in': 'slide-in 0.4s cubic-bezier(0.19,1,0.22,1) forwards',
      },
    },
  },
  plugins: [],
}

export default config
