const {
  rewireWorkboxInject,
  defaultInjectConfig
} = require("react-app-rewire-workbox")
const path = require("path")
const webpack = require("webpack")

module.exports = function override(config, env) {
  // ALIAS GENERATOR
  config.resolve = {
    alias: {
      "@actions": path.resolve(__dirname, "./src/store/actions"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@common": path.resolve(__dirname, "./src/components/common")
    }
  }

  // IMPORTANT: CONFIG RELATIVE TO WEBPACK ONLY HTTP2
  config.optimization = {
    splitChunks: {
      automaticNameDelimiter: "-",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          chunks: "all"
        },
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
    },
    runtimeChunk: {
      name: "runtime"
    }
  }

  // CONFIG RELATIVE TO PWA CHANGES
  if (env === "production") {
    const workboxConfig = {
      ...defaultInjectConfig,
      swSrc: path.join(__dirname, "src", "custom-sw.js")
    }
    config = rewireWorkboxInject(workboxConfig)(config, env)
  }

  return config
}
