// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",        // if using /app directory
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        accent: "#1e40af",
        muted: "#64748b",
        sidebar: "#f1f5f9",               // optional sidebar color
        darkSidebar: "#1e293b",           // dark mode sidebar
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      height: {
        screen: "100vh",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),         // for input styling
  ],
  darkMode: "class",                       // enables dark mode toggle
}
