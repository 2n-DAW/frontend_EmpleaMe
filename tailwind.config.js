/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}',
  ],
  theme: {
    extend: {
      width: {
        '1/7': '14.2857143%',
        '1/10': '10%',
      },
      colors: {
        customPurple: 'rgb(36 0 70)', // Aquí defines tu color personalizado
      },
    },
  },
  plugins: [],
}
