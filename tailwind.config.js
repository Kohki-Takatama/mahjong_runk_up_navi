/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
module.exports = {
  content: ['./src/*.{html,js}', './public/*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
