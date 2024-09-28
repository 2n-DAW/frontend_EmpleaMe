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
        customPurple: '#625D7E',
        color1: '#264653', // verde charcoal PRINCIPAL
        color2: '#39A296', // verde persian SECUNDARIO
        color3: '#89D2CA', // azul tiffany FOCUS
        color4: '#E9C46A', // naranja saffron HOVERS
        color5: '#89D2CA', // azul tiffany BUTTONS
        color6: '#000000', // negro TITLE1
        color7: '#000000', // negro TITLE2
        color8: '#737373', // gris DESCRIPTION1
        color9: '#4d4d4d', // gris DESCRIPTION2
        color10: '#d9d9d9', // gris HR
        color11: '#89D2CA', // azul tiffany BUTTON CANCEL

      },
    },
  },
  plugins: [],
}
