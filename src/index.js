const path = require('path');
const fs = require('fs');

export default class TotalConfigPlugin {
  constructor(options) {
    this.options = options;
    this.pushedPaths = [];
  }

  apply(compiler) {
    compiler.hooks.afterEnvironment.tap('TotalConfigPlugin', () => {
      const totalConfig = require(`${path.resolve()}/total.config`);

      for (const configKey in totalConfig) {

        const newConfig = totalConfig[configKey]
          
        const newConfigFilePath = newConfig.totalConfig && newConfig.totalConfig.filepath ? newConfig.totalConfig.filepath : `${configKey}.config.js`

        if(newConfig.totalConfig) delete newConfig.totalConfig

        const newConfigFileSource =
          `module.exports = ${JSON.stringify(newConfig)}`;
        fs.writeFile(newConfigFilePath, newConfigFileSource, () => {
          this.pushedPaths.push(newConfigFilePath);
        });
      }
    });

    compiler.hooks.afterEmit.tap('TotalConfigPlugin', () => {
      for (const filepath of this.pushedPaths) {
        fs.unlinkSync(`${path.resolve()}/${filepath}`);
      }
    });
  }
}
