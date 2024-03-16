/** @type {import('tailwindcss').Config} */
// tailwind.config.js

module.exports = function () {
  return {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    prefix: 'tw-',
    theme: {
      extend: {},
    },
    plugins: [],
  };
};

