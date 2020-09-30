module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  plugins: ["only-warn", "vue"],
  parserOptions: {
    parser: "babel-eslint"
  }
}
