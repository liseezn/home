/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00f2fe',
        secondary: '#4facfe',
        dark: '#0b0b1a',
      },
    },
  },
  plugins: [],
};
