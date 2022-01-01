import { Sizes, Spaces } from "@constants";
import { Button } from "native-base";
import React from "react";
import StyledBoldText from "./StyledBoldText";

type ChipProps = {
  innerText: string;
  isSelected: boolean;
  handleOnPressButton: () => void;
};

const Chip = ({ innerText, isSelected, handleOnPressButton }: ChipProps) => {
  return (
    <Button
      borderRadius="full"
      onPress={handleOnPressButton}
      background={isSelected ? "white" : "transparent"}
    >
      <StyledBoldText>{innerText}</StyledBoldText>
    </Button>
  );
};

export default Chip;
