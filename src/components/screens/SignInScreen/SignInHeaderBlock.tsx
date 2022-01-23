import StyledBoldText from "@components/atoms/StyledBoldText";
import { HeaderBlock } from "@components/blocks/HeaderBlock";
import { Sizes } from "@constants";
import { Button } from "native-base";
import React from "react";

type SignInHeaderBlockProps = {
  handleOnPressCloseButton: () => void;
};

const SignInHeaderBlock = ({
  handleOnPressCloseButton,
}: SignInHeaderBlockProps) => {
  return (
    <HeaderBlock
      centerComponent={
        <StyledBoldText style={{ fontSize: Sizes.bigText }}>
          로그인
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

export default SignInHeaderBlock;
