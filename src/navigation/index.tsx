/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import NotFoundScreen from "../components/screens/NotFoundScreen";

import LinkingConfiguration from "./LinkingConfiguration";
import { RootStackParamList } from "types/navigation";
import CreateAndEditDiaryScreen from "@components/screens/CreateAndEditDiaryScreen";
import DrawingScreen from "@components/screens/DrawingScreen";
import AppIntroduceScreen from "@components/screens/AppIntroduceScreen";
import PreviewScreen from "@components/screens/PreviewScreen";
import HomeScreen from "@components/screens/HomeScreen";
import SettingScreen from "@components/screens/SettingScreen";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Preview"
        component={PreviewScreen}
        // options={{ animation: "fade_from_bottom" }}
      />
      <Stack.Screen name="CreateAndEdit" component={CreateAndEditDiaryScreen} />
      <Stack.Screen name="AppIntroduce" component={AppIntroduceScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen
        name="NotFound"
        component={HomeScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "fullScreenModal" }}>
        <Stack.Screen name="Drawing" component={DrawingScreen} />
        {/* <Stack.Screen name="Modal" component={ModalScreen} /> */}
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
