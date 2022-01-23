import StyledBoldText from "@components/atoms/StyledBoldText";
import { HeaderBlock } from "@components/blocks/HeaderBlock";
import { Sizes } from "@constants";
import { Button } from "native-base";
import React from "react";

type SignUpHeaderBlockProps = {
  handleOnPressCloseButton: () => void;
};

const SignUpHeaderBlock = ({
  handleOnPressCloseButton,
}: SignUpHeaderBlockProps) => {
  return (
    <HeaderBlock
      centerComponent={
        <StyledBoldText style={{ fontSize: Sizes.bigText }}>
          회원가입
        </StyledBoldText>
      }
      rightComponent={
        <Button
          variant="ghost"
          colorScheme="success"
          onPress={handleOnPressCloseButton}
        >
          닫기
        </Button>
      }
    />
  );
};

export default SignUpHeaderBlock;
