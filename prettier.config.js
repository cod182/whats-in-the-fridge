// prettier.config.js
module.exports = {
  plugins: ['prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  "printWidth": 80,
  "trailingComma": "es5",
  "tabWidth": 4,
  "semi": true,
  "singleQuote": true,
  "importOrder": ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true
}