import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        openmenu: "openmenu 0.5s ease-in",
        closemenu: "closemenu 0.5s ease-in",
      },
      keyframes: {
        openmenu: {
          // initial width
          "0%": { width: "40px" },
          // final width
          "100%": { width: "400px" },
        },
        closemenu: {
          // initial position
          "0%": { width: "400px" },
          // final position
          "100%": { width: "40px" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
