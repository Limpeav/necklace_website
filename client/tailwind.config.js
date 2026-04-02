/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        blush: "#f3e8df",
        rose: "#d6a692",
        sand: "#d4c5b2",
        ink: "#211c1a",
        gold: "#9c7441",
        cream: "#f5efe7",
        mist: "#dce4df",
        pine: "#314740",
        ember: "#b3654d"
      },
      fontFamily: {
        display: ["DM Serif Display", "serif"],
        sans: ["Manrope", "sans-serif"]
      },
      boxShadow: {
        luxury: "0 28px 80px rgba(33, 28, 26, 0.16)",
        glow: "0 10px 30px rgba(156, 116, 65, 0.18)"
      },
      backgroundImage: {
        hero: "radial-gradient(circle at top left, rgba(255,255,255,0.92), rgba(243,232,223,0.58), rgba(220,228,223,0.5))",
        aurora: "linear-gradient(135deg, rgba(49,71,64,0.96), rgba(33,28,26,0.96) 55%, rgba(179,101,77,0.9))"
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -14px, 0)" }
        },
        rise: {
          "0%": { opacity: "0", transform: "translate3d(0, 18px, 0)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0)" }
        }
      },
      animation: {
        drift: "drift 8s ease-in-out infinite",
        rise: "rise 700ms ease-out both"
      }
    }
  },
  plugins: []
};
