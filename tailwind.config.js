/** @type {import('tailwindcss').Config} */
// const flowbite = require("flowbite-react/tailwind");
// import { flowbite } from 'flowbite-react';
import daisyui from 'daisyui';
import { Flowbite } from 'flowbite-react';
import { content } from 'flowbite-react/tailwind'; 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    content
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
    // Flowbite.plugin(),
  ],
}