import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import next from "eslint-config-next";
import importPlugin from "eslint-plugin-import";
import playwright from "eslint-plugin-playwright";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unicorn from "eslint-plugin-unicorn";

export default defineConfig([
  // Next.js configurations
  ...next.configs['core-web-vitals'],
  ...next.configs['typescript'],
  
  // Base JavaScript recommended rules
  js.configs.recommended,
  
  // TypeScript
  ...tseslint.configs.recommended,
  
  // Plugins
  {
    plugins: {
      import: importPlugin,
      playwright,
      'simple-import-sort': simpleImportSort,
      unicorn,
    },
    rules: {
      // Simple import sort
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
      
      // Unicorn rules
      "unicorn/no-array-callback-reference": "off",
      "unicorn/no-array-for-each": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/prevent-abbreviations": [
        "error",
        {
          allowList: {
            e2e: true
          },
          replacements: {
            props: false,
            ref: false,
            params: false
          }
        }
      ]
    }
  },
  
  // Playwright specific configuration
  {
    files: ["**/*.test.{js,jsx,ts,tsx}", "**/e2e/**/*.{js,jsx,ts,tsx}"],
    ...playwright.configs['flat/recommended'],
  },
  
  // Override for JavaScript files
  {
    files: ["**/*.js"],
    rules: {
      "unicorn/prefer-module": "off"
    }
  },
  
  // Ignore patterns
  {
    ignores: [
      ".next/**",
      "out/**", 
      "build/**",
      "next-env.d.ts",
      "node_modules/**",
      "dist/**"
    ]
  }
]);