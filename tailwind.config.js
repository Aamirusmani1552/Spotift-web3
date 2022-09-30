/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bodyColor: {
          700: "#111011",
        },
        sidebarColor: {
          800: "#000101",
        },
        sidebarFont: {
          300: "#B2B3B2",
        },
        mainBodyColor: {
          400: "#1E1F1F",
        },
        cardColor: "#191819",
        cardHover: "#252524",
        spotifyGreen: "#24D762",
        songCardHover: "#121313",
        musicPlayerColor: "#010100",
      },
      keyframes: {
        move: {
          "0%": { transform: "translateY(0)", opacity: "0.0" },
          "20%": { transform: "translateY(-4px)", opacity: "0.2" },
          "40%": { transform: "translateY(-8px)", opacity: "0.4" },
          "60%": { transform: "translateY(-12px)", opacity: "0.6" },
          "80%": { transform: "translateY(-16px)", opacity: "0.8" },
          "100%": { transform: "translateY(-20px)", opacity: "1.0" },
        },
      },
      animation: {
        moveToUp: "move 0.3s ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
