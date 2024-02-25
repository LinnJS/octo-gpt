/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  printWidth: 120,
  singleQuote: true,
  trailingComma: "all",
  tabWidth: 2,
  semi: true,
  useTabs: false,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
