import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ["tests/**/*.{js,mjs,cjs}"], // 👈 Adjust path to match your test folder
    languageOptions: {
      globals: {
        ...globals.jest, // ✅ Adds describe, it, expect, etc.
      },
    },
  },
]);
