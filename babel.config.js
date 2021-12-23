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
            "@components": "./src/components",
            "@hooks": "./src/hooks",
            "@constants": "./src/constants",
            "@Utils": "./src/Utils",
            "@types": "./src/types",
            "@state": "./src/state",
            "@assets": "./assets",
          },
        },
      ],
    ],
  };
};
