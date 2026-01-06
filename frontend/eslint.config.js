import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^[A-Z_]", // 忽略 _ 開頭的變數
          argsIgnorePattern: "^_", // 忽略 _ 開頭的參數 (這就是解決 .map 問題的關鍵)
          caughtErrorsIgnorePattern: "^_", // 忽略 _ 開頭的 catch error
          args: "after-used", // 如果參數後面有被用到的，前面的沒用到沒關係
        },
      ],

      // 'no-unused-vars': [
      //   "error",
      //   {
      //     "varsIgnorePattern": "^_", // 忽略變數名稱以 _ 開頭的 (例如 _test)
      //     "argsIgnorePattern": "^_", // 忽略參數名稱以 _ 開頭的 (例如 function(_, index))
      //     "caughtErrorsIgnorePattern": "^_" // 忽略 catch error 以 _ 開頭的
      //   }
      // ],
    },
  },
];
