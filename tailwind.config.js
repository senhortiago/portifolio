/** @type {import('tailwindcss').Config} */

/**
 * Design Tokens (White Label).
 * Para trocar a identidade visual, altere apenas a paleta `brand` abaixo.
 */
const brand = {
  bg: '#F5EFDF',
  'bg-soft': '#FBF8F0',
  surface: '#FFFFFF',
  glass: '#E7E1D0',
  ink: '#30231E',
  'ink-soft': '#4B3E39',
  muted: '#6F605A',
  line: '#4B3E39',
  accent: '#F6DD7A',
  'accent-strong': '#E9CB55',
  'accent-deep': '#D1B43E',
  secondary: '#2F6BD1',
  'secondary-soft': '#77A8BE',
  dark: '#1E1714',
  'dark-soft': '#2C221E',
  'on-dark': '#F5EFDF',
  success: '#3E8E41',
  danger: '#C2410C',
};

const arrowCursor = (path) =>
  `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44'><circle cx='22' cy='22' r='21' fill='%2330231E'/><path d='${path}' fill='none' stroke='%23F6DD7A' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/></svg>") 22 22`;

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: { brand },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        hand: ['Schoolbell', '"Bradley Hand ITC"', 'cursive'],
      },
      fontSize: {
        display: ['clamp(2.6rem, 6.8vw, 7.5rem)', { lineHeight: '0.92', letterSpacing: '-0.045em' }],
        'display-sm': ['clamp(2.25rem, 6vw, 5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        year: ['clamp(3.5rem, 5.6vw, 6.25rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
      },
      spacing: {
        'gutter-start': 'max(1rem, min(18.5625vw, 37vw - 119px))',
        'gutter-end': 'max(1rem, min(11.6875vw, 20vw - 53px))',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom, #FFFFFF, #F5EFDF)',
        'hero-lines':
          'repeating-linear-gradient(150deg, transparent 0, transparent 28.3px, rgba(75,62,57,1) 28.3px, rgba(75,62,57,1) 28.8px)',
        'hero-fade': 'linear-gradient(to bottom, rgba(245,239,223,0) 0%, #F5EFDF 78%)',
        'journey-line': 'linear-gradient(to bottom, rgba(48,35,30,0.55), rgba(48,35,30,0.25) 44%, rgba(48,35,30,0) 95%)',
        'popup-dark': 'linear-gradient(201deg, #3B3D38, #222222 48%, #444444 98%)',
        'accent-text': 'linear-gradient(to bottom, #FFF3B8, #F6DD7A 55%, #E9CB55)',
        'project-cover':
          'radial-gradient(120% 120% at 0% 0%, rgba(255,255,255,0.35), transparent 60%), linear-gradient(135deg, var(--cover-from), var(--cover-to))',
      },
      cursor: {
        'arrow-left': `${arrowCursor('M25 13 L16 22 L25 31')}, w-resize`,
        'arrow-right': `${arrowCursor('M19 13 L28 22 L19 31')}, e-resize`,
        'arrow-down': `${arrowCursor('M13 19 L22 28 L31 19')}, s-resize`,
      },
      transitionTimingFunction: {
        intro: 'cubic-bezier(0.22, 1, 0.36, 1)',
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        400: '400ms',
        1200: '1200ms',
        1500: '1500ms',
        2000: '2000ms',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '100%': { transform: 'scale(2.6)', opacity: '0' },
        },
        'caret-blink': {
          '0%, 45%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'slide-progress': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'scroll-hint': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'caret-blink': 'caret-blink 1s steps(1) infinite',
        'slide-progress': 'slide-progress var(--slide-duration, 8s) linear forwards',
        'scroll-hint': 'scroll-hint 1.6s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
      },
      zIndex: {
        lines: '30',
        header: '50',
        overlay: '60',
      },
    },
  },
  plugins: [],
};
