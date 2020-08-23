module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  plugins: ["only-warn"],
  parserOptions: {
    parser: "babel-eslint"
  }
}
