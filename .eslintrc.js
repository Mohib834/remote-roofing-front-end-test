module.exports = {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    parserOptions: {
      ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
      sourceType: "module", // Allows for the use of imports
      ecmaFeatures: {
        jsx: true // Allows for the parsing of JSX
      }
    },
    settings: {
      react: {
        version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
      }
    },
    extends: [
      "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
      "plugin:@typescript-eslint/recommended" // Uses the recommended rules from @typescript-eslint/eslint-plugin
    ],
    rules:{
      "no-console": "warn",
      "no-eval": "error",
      "indent": [2, "tab"],
      "react/jsx-max-props-per-line": [1, { "maximum": 1 }],
      "array-bracket-spacing": [2, "always"],
      "computed-property-spacing": [2, "always"],
      "object-curly-spacing": [2, "always"],
    }
};