import React from "react";
import { View as DefaultView } from "react-native";
import { Colors } from "@constants";

type ViewProps = DefaultView["props"];

const CustomView = (props: ViewProps) => {
  return (
    <DefaultView
      {...props}
      style={[{ backgroundColor: Colors.background, flex: 1 }, props.style]}
    />
  );
};

export default CustomView;
