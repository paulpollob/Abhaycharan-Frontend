/** @type {import('tailwindcss').Config} */
// const flowbite = require("flowbite-react/tailwind");
// import { flowbite } from 'flowbite-react';
import daisyui from 'daisyui'; 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // "./node_modules/flowbite/**/*.js"
 
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
    // Flowbite.plugin(),
    // import {Flowbite} from 'flowbite-react'
  ],
}