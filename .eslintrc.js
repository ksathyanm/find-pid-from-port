module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:node/recommended",
    "google",
  ],
  "env": {
    "node": true,
    "commonjs": true,
    "es2020": true,
  },
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "script",
  },
  "rules": {
    "quotes": ["error", "double"],
    "max-len": ["error", { "code": 120 }],
    "new-cap": ["off"],
    "object-curly-spacing": ["error", "always"],
    "semi": ["error", "never"],
  },
}
