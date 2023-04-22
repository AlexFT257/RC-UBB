/** @type {import('tailwindcss').Config} */


const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'transparent': "transparent",
      'current': "currentColor",
      'primaryDarkColor': "#FF6F59",
      'secondaryDarkColor': "#5B8FB9",
      'accentDarkColor': "#231842",
      'textDarkColor': "#a9dacb",
      'activeDarkColor': "#465D74",
      'bgDarkColor': "#03001C",

      'bgDarkColorTrasparent': "#03001c80",


      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
      blue: colors.blue,
      green: colors.green,
      pink: colors.pink,
      purple: colors.purple,
      teal: colors.teal,
      orange: colors.orange,
      lime: colors.lime,
      rose: colors.rose,
      sky: colors.sky,
      cyan: colors.cyan,
      fuchsia: colors.fuchsia,
      violet: colors.violet,
      
    },
    extend: {},
  },
  plugins: [],
}