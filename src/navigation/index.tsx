/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  Animated,
  ColorSchemeName,
  GestureResponderEvent,
  Touchable,
} from "react-native";

import NotFoundScreen from "../components/screens/NotFoundScreen";

import LinkingConfiguration from "./LinkingConfiguration";
import { RootStackParamList, RootTabParamList } from "types/navigation";
import CreateAndEditDiaryScreen from "@components/screens/CreateAndEditDiaryScreen";
import DrawingScreen from "@components/screens/DrawingScreen";
import AppIntroduceScreen from "@components/screens/AppIntroduceScreen";
import PreviewScreen from "@components/screens/PreviewScreen";
import HomeScreen from "@components/screens/HomeScreen";
import SettingScreen from "@components/screens/SettingScreen";
import {
  TapGestureHandler,
  TouchableOpacity,
} from "react-native-gesture-handler";
import CustomView from "@components/atoms/CustomView";
import ShowOffScreen from "@components/screens/ShowOffScreen";
import { Pressable } from "native-base";
import { Colors } from "@constants";
import UserScreen from "@components/screens/UserScreen";

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
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Root" component={BottomTapNavigator} />
      <Stack.Screen name="Preview" component={PreviewScreen} />
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
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTapNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          position: "absolute",
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
        },
      }}
    >
      <BottomTab.Group>
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarButton: (props) => (
              <TabBarButton name={"home"} tabProps={props} />
            ),
          }}
        />
        <BottomTab.Screen
          name="ShowOff"
          component={ShowOffScreen}
          options={{
            tabBarButton: (props) => (
              <TabBarButton name={"globe"} tabProps={props} />
            ),
          }}
        />
        <BottomTab.Screen
          name="User"
          component={UserScreen}
          options={{
            tabBarButton: (props) => (
              <TabBarButton name={"user"} tabProps={props} />
            ),
          }}
        />
      </BottomTab.Group>
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome {...props} />;
}

const TabBarButton = (props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  tabProps: BottomTabBarButtonProps;
}) => {
  const { onPress, accessibilityState } = props.tabProps;
  const focus = accessibilityState ? accessibilityState.selected : false;
  const [animValue, setAnimValue] = useState(new Animated.Value(focus ? 1 : 0));

  const onClick = (e: GestureResponderEvent) => {
    onPress && onPress(e);
  };

  useEffect(() => {
    if (accessibilityState) {
      if (accessibilityState.selected) {
        Animated.timing(animValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(animValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [accessibilityState]);

  const animationStyles = {
    transform: [
      {
        rotate: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
      {
        scale: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [2, 3],
        }),
      },
    ],
  };

  return (
    <Pressable
      onPress={(e) => onClick(e)}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Animated.View style={animationStyles}>
        <TabBarIcon
          name={props.name}
          color={focus ? Colors.black : Colors.gray}
        />
      </Animated.View>
    </Pressable>
  );
};
