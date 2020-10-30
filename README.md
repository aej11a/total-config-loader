
<div align="center">
  <!-- PR's Welcome -->
  <a href="http://makeapullrequest.com" style="width: 50%">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square"
      alt="PR's Welcome" />
  </a>
  
</div>

<h1 align="center">TotalConfig Webpack Plugin</h1>

<div align="center">
  A webpack 4 plugin which allows you to combine your configuration files into 1, to reduce code clutter.
</div>

## Table of Contents
- [Motivation](#motivation)
- [Features](#features)
- [Usage](#usage)

## Motivation

In some projects, I wind up with tons of ***.config.js files, for example babel.config.js, jest.config.js, postcss.config.js, etc. Since they all start with different names, these files wind up scattered throughout my file tree, hard to visually find, and add a lot of clutter for files which rarely change. This plugin allows you to combine those files into one.

#### Who is this for?
This is for you if you have multiple configuration files, especially if they don't change very often.

It is *not* for you if you only have one config file or if you're not using webpack.

## Features

- Combine all `***.config.js` files into a single `total.config.js` file
- UPCOMING: Specify different filepaths as alternatives to `***.config.js`
- UPCOMING: Choose between JS and JSON output for each config file

## Usage

*Note: If you use this plugin and also include the config files, the files will be deleted and overwritten by the plugin. Do NOT try to put your webpack config info into your total.config.js file*

1. Install: `yarn add total-config-webpack-plugin`

2. In your webpack config, add this plugin:

`const TotalConfigPlugin = require('../total-config-plugin/dist/cjs')`
```js
plugins: [
  ...
  new TotalConfigPlugin({}),
  ...
]
```

3. Create a file in the same directory as your webpack config, and call it `total.config.js`. Here's an example:
```
module.exports = {
    test: {
        message: "Hello world!"
    },
    babel: {
      presets: ['@babel/preset-env']
    }
}
```
This will generate two temporary config files at build-time, `test.config.js` and `babel.config.js`, which will export the config objects given in the total config respectively.