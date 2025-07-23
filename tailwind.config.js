/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2e353c',
        'secondary': '#f0f0f0',
        'primary-text': '#f0f0f0',
        'secondary-text': '#2e353c',
        'test-cl': "#2786ff",
        'menu-items': "#333333",
        'secondary-color': "#2d343b"
      }
    },
  },
  plugins: [],
}

