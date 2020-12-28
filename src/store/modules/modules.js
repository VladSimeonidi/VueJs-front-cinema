import camelCase from "lodash/camelCase";

const requireModule = require.context(".", false, /\.js$/); //extract js files inside modules folder
const modules = {};

requireModule.keys().forEach((fileName) => {
  if (fileName === "./modules.js") return; //reject the modules.js file

  const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, "")); //

  modules[moduleName] = requireModule(fileName);
});
export default modules;
