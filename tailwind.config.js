module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    fontFamily: {
      sans: "Roboto, Arial, sans-serif",
      serif: "Merriweather, Georgia, serif",
    },
    extend: {
      height: {
        screens: "300vh",
      },
      colors: {
        primary: "#672E9B",
        gray: {
          300: "#f0f0f0",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
