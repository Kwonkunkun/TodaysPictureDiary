import StyledBoldText from "@components/atoms/StyledBoldText";
import { HeaderBlock } from "@components/blocks/HeaderBlock";
import { Sizes } from "@constants";
import { AntDesign } from "@expo/vector-icons";
import { Button, Icon, IconButton } from "native-base";
import React from "react";

type ShowOffHeaderBlockProps = {
  handleOnPressQuestionIconButton: () => void;
};

const ShowOffHeaderBlock = ({
  handleOnPressQuestionIconButton,
}: ShowOffHeaderBlockProps) => {
  return (
    <HeaderBlock
      centerComponent={
        <StyledBoldText style={{ fontSize: Sizes.bigText }}>
          다른사람들의 일기
        </StyledBoldText>
      }
      rightComponent={
        <IconButton
          icon={
            <Icon as={<AntDesign name="question" />} size="sm" color="white" />
          }
          onPress={() => {
            handleOnPressQuestionIconButton();
          }}
        />
      }
    />
  );
};

export default ShowOffHeaderBlock;
