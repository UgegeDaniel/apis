const tsConfigPaths = require('tsconfig-paths');

const baseUrl = './'; // Adjust this based on your project structure
const mainTsConfig = require('./tsconfig.json');

tsConfigPaths.register({
  baseUrl,
  paths: mainTsConfig.compilerOptions.paths,
});
