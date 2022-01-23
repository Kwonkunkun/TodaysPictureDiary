import StyledBoldText from "@components/atoms/StyledBoldText";
import { HeaderBlock } from "@components/blocks/HeaderBlock";
import { Sizes } from "@constants";
import { AntDesign } from "@expo/vector-icons";
import { Icon, IconButton } from "native-base";
import React from "react";

type UserHeaderBlockProps = {
  handleOnPressQuestionIconButton: () => void;
};

const UserHeaderBlock = ({
  handleOnPressQuestionIconButton,
}: UserHeaderBlockProps) => {
  return (
    <HeaderBlock
      centerComponent={
        <StyledBoldText style={{ fontSize: Sizes.bigText, color: "green" }}>
          사용자 정보
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

export default UserHeaderBlock;
