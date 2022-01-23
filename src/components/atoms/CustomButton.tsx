import { Colors, Sizes } from "@constants";
import { Button } from "native-base";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import StyledBoldText from "./StyledBoldText";

type CustomButton = {
  innerText: string;
  handleOnPressButton: () => void;
  style?: StyleProp<ViewStyle>;
};

const CustomButton = ({
  innerText = "",
  handleOnPressButton,
  style,
}: CustomButton) => {
  return (
    <Button
      variant={""}
      onPress={handleOnPressButton}
      bg={Colors.button}
      style={style}
    >
      <StyledBoldText style={{ color: Colors.snow, fontSize: Sizes.bigText }}>
        {innerText}
      </StyledBoldText>
    </Button>
  );
};

export default CustomButton;
