const { defineConfig } = require("vite");
const Path = require("path");
const reactPlugin = require("@vitejs/plugin-react");
const { inspectorServer } = require("@react-dev-inspector/vite-plugin");
const { quasar, transformAssetUrls } = require("@quasar/vite-plugin");

/**
 * https://vitejs.dev/config
 */
const config = defineConfig({
  root: Path.join(__dirname, "..", "src", "renderer"),
  publicDir: "public",
  server: {
    port: 8080,
  },
  open: false,
  build: {
    outDir: Path.join(__dirname, "..", "build", "renderer"),
    emptyOutDir: true,
  },
  plugins: [
    reactPlugin({
      template: { transformAssetUrls },
    }),
    inspectorServer(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // 重写 less 变量，定制样式
        modifyVars: {
          "@primary-color": "red",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": Path.join(__dirname, "..", "src", "renderer"),
    },
  },
});

module.exports = config;
