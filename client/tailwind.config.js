/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        //bg: "#F7EDE2",
        bg: "#f8edeb",
        //bg : "#cbdfbd" ,
        accent: "#083030",
      },boxShadow: {
        '3xl': '12px 12px 1px 0px rgba(0, 0, 0, 0.9)',
      },
      animation: {
        typewriter:
          "typing 2s steps(11) infinite alternate-reverse, typewriterDelay 4s infinite", // Adding typewriter-delay class to introduce a delay
      },
      keyframes: {
        typing: {
          from: {left: "0%" },
          to: { left: "100%" },
        },
        typewriterDelay: {
          "0%": { left: "0%" },
          "100%": { left: "0%" },
          "50%": { left: "100%" },
        },
      },
    },
  },
  plugins: [],
};
