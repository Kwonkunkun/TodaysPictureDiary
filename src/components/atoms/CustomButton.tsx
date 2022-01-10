import { Colors, Sizes } from "@constants";
import { Button } from "native-base";
import React from "react";
import StyledBoldText from "./StyledBoldText";

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
      <StyledBoldText style={{ color: Colors.snow, fontSize: Sizes.midText }}>
        {innerText}
      </StyledBoldText>
    </Button>
  );
};

export default CustomButton;
