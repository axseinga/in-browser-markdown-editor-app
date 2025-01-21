/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "customGrey-200": "#F5F5F5",
        "customGrey-300": "#E4E4E4",
        "customGrey-400": "#C1C4CB",
        "customGrey-500": "#7C8187",
        "customGrey-600": "#5A6069",
        "customGrey-700": "#35393F",
        "customGrey-800": "#2B2D31",
        "customGrey-900": "#1D1F22",
        customBlack: "#151619",
        customOrange: "#E46643",
        customOrangeHover: "#F39765",
      },
      fontFamily: {
        roboto: "Roboto, serif",
        robotoSlab: "Roboto Slab, serif",
        robotoMono: "Roboto Mono, serif",
      },
    },
  },
  plugins: [],
};
