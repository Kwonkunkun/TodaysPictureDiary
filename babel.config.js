module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [
            ".ios.ts",
            ".android.ts",
            ".ts",
            ".ios.tsx",
            ".android.tsx",
            ".tsx",
            ".jsx",
            ".js",
            ".json",
          ],
          alias: {
            "@": "./src",
            "@components": "./src/components",
            "@hooks": "./src/hooks",
            "@constants": "./src/constants",
            "@types": "./src/types",
            "@state": "./src/state",
            "@assets": "../assets",
          },
        },
      ],
    ],
  };
};
