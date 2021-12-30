import React from "react";
import { Text as DefaultText } from "react-native";
import { Colors, Sizes, Spaces } from "@constants";

export type TextProps = DefaultText["props"];

const StyledText = (props: TextProps) => {
  return (
    <DefaultText
      {...props}
      style={[
        {
          // fontFamily: "crayon",
          fontFamily: "young-child",
          fontSize: Sizes.midText,
        },
        props.style,
      ]}
    />
  );
};

export default StyledText;
