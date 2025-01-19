/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */

const config = {
  trailingComma: "es5",
  tabWidth: 2,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "<BUILTIN_MODULES>",
    "^[^@#~\.].*",
    "<THIRD_PARTY_MODULES>",
    "^#(/.*)$",
    "^[.]",
  ],
};

export default config;
