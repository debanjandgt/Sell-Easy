/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundColor: ['hover'],
        primary: "#4fd1c5",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}