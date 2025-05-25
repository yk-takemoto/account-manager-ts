import pluginTypescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";

const external = [
  "@nestjs/common",
  "@nestjs/config",
  "@nestjs/core",
  "jwt-decode",
  "reflect-metadata",
  "rxjs",
  "zod"
];

const globals = {
  "@nestjs/common": "nestjsCommon",
  "@nestjs/config": "nestjsConfig",
  "@nestjs/core": "nestjsCore",
  "jwt-decode": "jwtDecode",
  "reflect-metadata": "Reflect",
  "rxjs": "rxjs",
  "zod": "zod"
};

const plugins = [pluginTypescript(), commonjs()];

export default [
  {
    input: "./src/index.ts",
    output: {
      file: "./lib/bundle.cjs.js",
      format: "cjs",
      sourcemap: true,
    },
    external,
    plugins: [...plugins, terser()],
  },
  {
    input: "./src/index.ts",
    output: {
      file: "./lib/bundle.esm.js",
      format: "esm",
      sourcemap: true,
    },
    external,
    plugins,
  },
  {
    input: "./src/index.ts",
    output: {
      name: "auth_server",
      file: "./lib/bundle.umd.js",
      format: "umd",
      sourcemap: true,
      globals,
    },
    external,
    plugins: [...plugins, terser()],
  },
];