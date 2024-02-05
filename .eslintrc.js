module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "airbnb-base",
    "airbnb-typescript",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["dist", "src/api", "src/ui-components"],
  plugins: ["react", "@typescript-eslint", "unused-imports", "import"],
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescript-eslint/comma-dangle": "off",
    "object-curly-newline": "off",
    "no-param-reassign": [
      "error",
      {
        props: false,
      },
    ],
    "function-paren-newline": "off",
    "implicit-arrow-linebreak": "off",
    "no-void": "off",
    "operator-linebreak": "off",
    "@typescript-eslint/indent": "off",
    "no-confusing-arrow": "off",
    "no-continue": "off",
    "@typescript-eslint/no-misused-promises": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
