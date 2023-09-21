/**  ↓--------------------------------↓  
Do not tamper with this file.
Path settings are in config in package.json
↑------------------------------------↑*/

const path = require('path');

const dest = `${process.env.npm_package_config_dest}/`;

const subDirectory = process.env.npm_package_config_subDirectory;

const assetPath = process.env.npm_package_config_assetPath;

module.exports = {
  appDest: dest,
  appBuild: path.resolve(`${dest}${subDirectory}`),
  appSrc: path.resolve('src') + '/',
  subDirectory: subDirectory,
  assetPath: assetPath
};
