/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  mode: 'jit',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        display: ['"Special Elite"', '"Courier New"', 'monospace'],
        serif: ['"IBM Plex Serif"', 'Georgia', 'Cambria', 'serif'],
      },
      colors: {
        paper: '#f1e9d4',
        'paper-deep': '#e7dcc0',
        'paper-edge': '#d8caa6',
        ink: '#33291d',
        'ink-soft': '#5c4d3a',
        rust: '#8c3a1e',
        'rust-bright': '#9c4526',
        mustard: '#96741f',
        stamp: '#7d3a30',
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/topography.svg')",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
