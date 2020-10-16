import typescript from "rollup-plugin-typescript2"; // Rollup plugin for typescript with compiler errors
import sourcemaps from "rollup-plugin-sourcemaps";
import json from "@rollup/plugin-json"; // Converts .json files to ES6 modules

export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "umd",
    sourcemap: true,
    name: "antvDatasets"
  },
  plugins: [
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript"),
    }),
    sourcemaps(),
    json(),
  ],
};
