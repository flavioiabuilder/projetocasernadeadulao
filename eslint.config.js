"use strict";

module.exports = [
  {
    files: [
      "programas/discipulando-a-caserna/prototipos/prospecto-v1/js/**/*.js",
      "programas/discipulando-a-caserna/ferramentas/**/*.js",
      "programas/discipulando-a-caserna/testes/**/*.js",
      "referencias-devtools/aramco-birth-of-oil/design-system/js/**/*.js",
      "referencias-devtools/aramco-birth-of-oil/ferramentas/**/*.js",
      "referencias-devtools/aramco-birth-of-oil/testes/**/*.js",
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        location: "readonly",
        console: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        process: "readonly",
        Buffer: "readonly",
        IntersectionObserver: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
        URL: "readonly",
        HTMLElement: "readonly",
        Node: "readonly",
        DocumentFragment: "readonly",
        history: "readonly",
        getComputedStyle: "readonly",
        performance: "readonly",
        matchMedia: "readonly",
        CSSRule: "readonly",
        Float32Array: "readonly",
      },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-var": "error",
      "prefer-const": "warn",
      eqeqeq: ["error", "smart"],
    },
  },
  {
    files: ["programas/discipulando-a-caserna/testes/e2e/**/*.js"],
    languageOptions: {
      globals: {
        getComputedStyle: "readonly",
      },
    },
  },
];
