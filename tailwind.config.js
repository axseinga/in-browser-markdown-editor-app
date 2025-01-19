/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "customlightGrey-200": "#F5F5F5",
        "customlightGrey-300": "#E4E4E4",
        "customlightGrey-400": "#C1C4CB",
        "customlightGrey-500": "#7C8187",
        "customlightGrey-600": "#5A6069",
        "customlightGrey-700": "#35393F",
        "customlightGrey-800": "#2B2D31",
        "customlightGrey-900": "#1D1F22",
        customBlack: "#151619",
        customOrange: "#E46643",
        customOrangeHover: "#F39765",
      },
      fontSize: {
        "preview-h1": ["2rem", "100%"],
        "preview-h2": ["1.75rem", "100%"],
        "preview-h3": ["1.5rem", "100%"],
        "preview-h4": ["1.25rem", "100%"],
        "preview-h5": ["1rem", "100%"],
        "preview-h6": ["0.875rem", "100%"],
        markdown: ["0.875rem", "1.5rem"],
        "preview-paragraph": ["0.875rem", "1.5rem"],
        "heading-m-in-app": ["0.938rem", "100%"],
        "heading-s-in-app": ["0.875rem", "100%"], // 0.125rem character spacing
        "body-in-app": ["0.813rem", "100%"],
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
