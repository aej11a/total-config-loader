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
        const newConfigFileSource =
          `module.exports = ${JSON.stringify(totalConfig[configKey])}`;
          
        fs.writeFile(`${configKey}.config.js`, newConfigFileSource, () => {
          this.pushedPaths.push(`${configKey}.config.js`);
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
