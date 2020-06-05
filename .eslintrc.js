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
      "react/prop-types":0,
      "@typescript-eslint/no-use-before-define": ["off"],
      "@typescript-eslint/ban-ts-ignore": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "object-curly-spacing": [2, "always"],
      "react/jsx-curly-spacing": [1],
      "semi": [2, "always"],
      "no-console": ["warn"]
    }
};