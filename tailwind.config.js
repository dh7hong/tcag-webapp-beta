// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#101010',
        darkCard: '#181818',
        accent: '#0ea5e9',
      },
    },
  },
  plugins: [],
};