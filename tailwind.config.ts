import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EAF3DE",
          100: "#C0DD97",
          200: "#97C459",
          300: "#639922",
          400: "#3B6D11",
          500: "#27500A",
          600: "#173404",
          DEFAULT: "#639922"
        },
        secondary: {
          50: "#E6F1FB",
          100: "#B5D4F4",
          200: "#85B7EB",
          300: "#378ADD",
          400: "#185FA5",
          500: "#0C447C",
          600: "#042C53",
          DEFAULT: "#378ADD"
        },
        danger: {
          light: "#FCEBEB",
          DEFAULT: "#E24B4A",
          dark: "#A32D2D"
        },
        warning: {
          light: "#FAEEDA",
          DEFAULT: "#EF9F27",
          dark: "#854F0B"
        },
        neutral: {
          50: "#F9F9F7",
          100: "#F1EFE8",
          200: "#D3D1C7",
          300: "#B4B2A9",
          400: "#888780",
          500: "#5F5E5A",
          600: "#444441",
          700: "#2C2C2A"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"]
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.875rem",
        xl: "1.25rem",
        "2xl": "1.75rem"
      }
    }
  },
  plugins: []
};

export default config;
