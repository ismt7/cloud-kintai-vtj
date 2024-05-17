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
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: ["dist", "src/api", "src/ui-components/*"],
  plugins: [
    "@typescript-eslint",
    "react",
    "import",
    "simple-import-sort",
    "unused-imports",
  ],
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
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
