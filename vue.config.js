const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  configureWebpack: {
    devServer: {
      proxy: "https://storage.googleapis.com/",
    },
  },
  transpileDependencies: ["vuetify"],
});
