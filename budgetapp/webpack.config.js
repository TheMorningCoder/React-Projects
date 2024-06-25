const createWebpackConfigAsync = require("@expo/webpack-config");
module.exports = async function (env, argv) {
  const config = await createWebpackConfigAsync(env, argv);
  // Customize the config here if needed
  config.resolve.alias["react-native-vector-icons"] =
    "react-native-vector-icons/dist/index.js";
  return config;
};
