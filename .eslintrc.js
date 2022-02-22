module.exports = {
  root: true,
  env: {
    es6: true,
    jest: true,
  },
  globals: {
    wx: true,
  },
  extends: [
    "taro/react",
    "airbnb",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:import/typescript",
  ],
  plugins: ["prettier", "react-hooks", "@typescript-eslint"],
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": [
      1,
      {
        args: "none",
      },
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": 0, // 检查 effect 的依赖
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    "import/no-extraneous-dependencies": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "no-param-reassign": 0,
    "react/prop-types": 0, // ts 不需要prop-type
    "import/extensions": 0,
    "react/jsx-props-no-spreading": 0,
    "react/jsx-one-expression-per-line": 0,
    "@typescript-eslint/camelcase": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "no-restricted-globals": ["error", "event"], // 禁用的全局变量
    "jsx-a11y/no-noninteractive-element-interactions": 0, // 非交互性的标签，允许绑定事件
    "@typescript-eslint/no-use-before-define": 0,
    "react/jsx-wrap-multilines": 0, // 多行jsx 需要用()包裹
    "react/destructuring-assignment": "off",
    "no-plusplus": ["off"],
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "no-use-before-define": 0,
    "react/require-default-props": 0,
    camelcase: 0,
    "no-underscore-dangle": 0,
    "no-useless-constructor": 0,
    "consistent-return": 0,
    "class-methods-use-this": ["off"],
    "@typescript-eslint/ban-ts-comment": 0,
    "react/no-unused-class-component-methods": "off",
    "@typescript-eslint/no-empty-function": "off",
    "react/function-component-definition": "off",
    "global-require": "off",
    "@typescript-eslint/no-var-requires": "off",
    "func-names": "off",
    "prefer-promise-reject-errors": "off",
    "@typescript-eslint/ban-types": "off",
    "no-restricted-syntax": "off",
    "no-prototype-builtins": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaFeatures: {
      jsx: true,
    },
  },
};
