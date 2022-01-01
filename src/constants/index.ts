import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const Colors = {
  header: "#FFAAA7",
  background: "#FFD3B4",
  subBackground: "#FFD3B4",
  button: "#6D88B3",
  text: "#000000",
  accentText: "#FFD3B4",
  icon: "#FFD3B4",
  white: "#ffffff",
  snow: "#fffafa",
  black: "#000000",
};

export const Dimension = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};

const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export const ThemeColors = {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};

export const Spaces = {
  padding: 15,
  textPadding: 6,
  left: 12,
  right: 12,
  top: 12,
  botton: 12,
};

export const Sizes = {
  icon: 18,
  borderRadius: 10,
  bigText: 15,
  midText: 13,
  smallText: 10,
  smallButton: 150,
  chip: 60,
};
