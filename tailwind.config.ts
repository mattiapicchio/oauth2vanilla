import type { Config } from 'tailwindcss'
import { COLORS } from './src/assets/css/tailwindColors'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class', // disable automatic dark mode
  theme: {
    extend: {
      colors: COLORS,
    },
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
        '3xl': '1536px',
      },
    },
    boxShadow: {
      'custom-light': '0 4px 8px rgba(255, 255, 255, 0.2)',
    },
    borderRadius: {
      lg: `var(--radius)`,
      md: `calc(var(--radius) - 2px)`,
      sm: 'calc(var(--radius) - 4px)',
    },
    fontSize: {
      large: ['1.75rem', '1.313rem'], // to replace
      xlHeading: [
        '2rem',
        {
          lineHeight: '2rem',
          letterSpacing: '-1.6px',
          fontWeight: '900',
        },
      ],
      largeHeading: [
        '1.75rem',
        {
          lineHeight: '1.75rem',
          letterSpacing: '-1.4px',
          fontWeight: '700',
        },
      ],
      mediumHeading: [
        '1.5rem',
        {
          lineHeight: '1.35rem',
          fontWeight: '600',
        },
      ],
      smallHeading: [
        '1.125rem',
        {
          lineHeight: '0.875rem',
          letterSpacing: '-0.7px',
          fontWeight: '600',
        },
      ],
      body: [
        '1rem',
        {
          lineHeight: '1.5rem',
          fontWeight: '400',
        },
      ],
      label: [
        '1rem',
        {
          lineHeight: '1rem',
          fontWeight: '500',
        },
      ],
    },
  },
  plugins: [],
}
export default config
