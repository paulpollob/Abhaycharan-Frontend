/** @type {import('tailwindcss').Config} */
// const flowbite = require("flowbite-react/tailwind");
// import { flowbite } from 'flowbite-react';
import daisyui from 'daisyui'; 
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", './public/index.html'
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