import { Colors, Sizes } from "@constants";
import { Button } from "native-base";
import React from "react";
import StyledText from "./StyledText";

type CustomButton = {
  innerText: string;
  handleOnPressButton: () => void;
};

const CustomButton = ({
  innerText = "",
  handleOnPressButton,
}: CustomButton) => {
  return (
    <Button bg={Colors.button} onPress={handleOnPressButton}>
      <StyledText style={{ color: Colors.white, fontSize: Sizes.midText }}>
        {innerText}
      </StyledText>
    </Button>
  );
};

export default CustomButton;
