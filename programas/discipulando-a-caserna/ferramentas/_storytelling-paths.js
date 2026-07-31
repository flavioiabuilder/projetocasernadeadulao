"use strict";
/**
 * Paths do protótipo storytelling-v1 (multiarquivo: index + css/ + js/).
 */
const path = require("path");

const root = path.join(__dirname, "..", "prototipos", "storytelling-v1");

module.exports = {
  root,
  html: path.join(root, "index.html"),
  css: {
    tokens: path.join(root, "css", "tokens.css"),
    layout: path.join(root, "css", "layout.css"),
    components: path.join(root, "css", "components.css"),
  },
  js: {
    deck: path.join(root, "js", "deck.js"),
    shine: path.join(root, "js", "shine.js"),
  },
  cssFiles() {
    return [this.css.tokens, this.css.layout, this.css.components];
  },
  jsFiles() {
    return [this.js.deck, this.js.shine];
  },
};
