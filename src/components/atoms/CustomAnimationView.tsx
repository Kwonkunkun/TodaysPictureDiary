import React, { useEffect, useState } from "react";
import { StyleProp, View as DefaultView, ViewStyle } from "react-native";
import { Animated } from "react-native";
import { Colors } from "@constants";

type CustomAnimationViewProps = DefaultView["props"];

const CustomAnimationView = (props: CustomAnimationViewProps) => {
  const [animValue, setAnimValue] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(animValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);

  const defaultStyles = {
    backgroundColor: Colors.background,
    flex: 1,
  };

  const animationStyles = {
    backgroundColor: animValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["white", Colors.background],
    }),
  };

  return (
    <Animated.View
      {...props}
      style={[defaultStyles, animationStyles, props.style]}
    />
  );
};

export default CustomAnimationView;
