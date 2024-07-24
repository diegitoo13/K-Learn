/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
      'custom': ['Avenir Next', 'Muli', 'sans-serif'],
    }
  },
  },
  plugins: [],
}
