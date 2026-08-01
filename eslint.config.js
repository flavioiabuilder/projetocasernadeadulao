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
  // Referência DevTools soul-church (reconstrução Átrio). Bloco próprio:
  // o runtime usa APIs de observação e de foco que os outros escopos não
  // precisam, e nenhum global daqui deve vazar para os demais.
  {
    files: [
      "referencias-devtools/soul-church/design-system/js/**/*.js",
      "referencias-devtools/soul-church/ferramentas/**/*.js",
      "referencias-devtools/soul-church/testes/**/*.js",
      "referencias-devtools/soul-church/playwright.config.js",
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        globalThis: "readonly",
        console: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        process: "readonly",
        URL: "readonly",
        Set: "readonly",
        Map: "readonly",
        HTMLElement: "readonly",
        Node: "readonly",
        IntersectionObserver: "readonly",
        ResizeObserver: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
        getComputedStyle: "readonly",
        matchMedia: "readonly",
        performance: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
      },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          // `catch (_erro)` sem uso é intencional: o bloco existe para
          // engolir a falha, não para inspecioná-la.
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "no-var": "error",
      "prefer-const": "warn",
      eqeqeq: ["error", "smart"],
    },
  },
];
