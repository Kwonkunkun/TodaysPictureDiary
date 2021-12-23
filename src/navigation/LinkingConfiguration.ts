/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { RootStackParamList } from "types/navigation";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Home: "home",
      Preview: "preview",
      Setting: "setting",
      AppIntroduce: "appIntroduce",
      CreateAndEdit: "create",
      Drawing: "drawing",
      ColorPicker: "colorPicker",
      NotFound: "*",
    },
  },
};

export default linking;
