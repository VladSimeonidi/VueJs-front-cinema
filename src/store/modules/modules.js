import camelCase from "lodash/camelCase";

const requireModule = require.context(".", false, /\.js$/); // извлечь файлы js в папку модулей
const modules = {};

requireModule.keys().forEach((fileName) => {
  if (fileName === "./modules.js") return; // отклонить файл modules.js

  const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ""));

  modules[moduleName] = requireModule(fileName);
});
export default modules;
