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
      "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
    ],
    rules:{
      "react/jsx-indent":[2, 4],
      "react/jsx-indent-props": [2, 2],
      "react/jsx-max-props-per-line": [1, { "maximum": 1 }],
      "react/jsx-closing-bracket-location": [1, {"location": "line-aligned"}],
      "array-bracket-spacing": [2, "always"],
      "computed-property-spacing": [2, "always"],
      "object-curly-spacing": [2, "always"],
      "semi": [2, "always"],
      "react/prop-types":0,
    }
};