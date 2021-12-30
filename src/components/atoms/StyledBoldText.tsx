import React from "react";
import { Text as DefaultText } from "react-native";
import { Sizes } from "@constants";

export type TextProps = DefaultText["props"];

const StyledBoldText = (props: TextProps) => {
  return (
    <DefaultText
      {...props}
      style={[
        {
          // fontFamily: "crayon",
          fontFamily: "young-child-bold",
          fontSize: Sizes.midText,
        },
        props.style,
      ]}
    />
  );
};

export default StyledBoldText;
