/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#DEE8EF",
        card: "#EBF0F5",
        text: "#090a0a",
        secondary: "#F0F9FE",
        nav: "#384B70",
      },
    },
  },
  plugins: [],
};
