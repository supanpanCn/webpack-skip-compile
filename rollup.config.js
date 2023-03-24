const { babel } = require("@rollup/plugin-babel");
const { defineConfig } = require("rollup");
const path = require("path");
const pkg = require("./package.json");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");

const getPath = (_path) => path.resolve(__dirname, _path);

function bableConfig() {
  return babel({
    exclude: "node_modules/**",
    babelHelpers: "runtime",
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
          targets: {
            chrome: "67",
          },
        },
      ],
    ],
    plugins: [["@babel/plugin-transform-runtime"]],
  });
}

const config = defineConfig({
  input: getPath("./src/index.js"),
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
  ],
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    bableConfig(),
  ],
});

module.exports = function () {
  return defineConfig([config]);
};
