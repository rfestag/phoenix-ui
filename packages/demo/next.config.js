const path = require("path");
const withTM = require("next-transpile-modules")(["@phoenix-ui"]);
const withCustomBabelConfigFile = require("next-plugin-custom-babel-config");
const withImages = require("next-images");

module.exports = withImages(
  withTM(
    withCustomBabelConfigFile({
      babelConfigFile: path.resolve("../../babel.config.js"),
      experimental: {
        css: true,
      },
    })
  )
);
