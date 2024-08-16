import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Use 'class' to toggle dark mode using a class on the root element
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)", // Using CSS variable for primary color
        text: "var(--color-text)",       // Using CSS variable for text color
        grey: "var(--color-grey)",       // Using CSS variable for grey color
      },
      keyframes: {
        slidein: {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        slidein300: "slidein 1s ease 300ms forwards",
        slidein500: "slidein 1s ease 500ms forwards",
        slidein700: "slidein 1s ease 700ms forwards",
      },
      backgroundImage: {},
    },
  },
  plugins: [],
};

export default config;
