/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Vermeer-inspired palette
        vermeer: {
          deepBlue: '#1e3a5f',
          softBlue: '#2d4a6b',
          white: '#f5f5f0',
          ochre: '#d4a574',
          darkOchre: '#b8935f',
        },
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}

