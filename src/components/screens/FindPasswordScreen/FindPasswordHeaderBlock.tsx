import StyledBoldText from "@components/atoms/StyledBoldText";
import { HeaderBlock } from "@components/blocks/HeaderBlock";
import { Sizes } from "@constants";
import { Button } from "native-base";
import React from "react";

type FindPasswordHeaderBlockProps = {
  handleOnPressCloseButton: () => void;
};

const FindPasswordHeaderBlock = ({
  handleOnPressCloseButton,
}: FindPasswordHeaderBlockProps) => {
  return (
    <HeaderBlock
      centerComponent={
        <StyledBoldText style={{ fontSize: Sizes.bigText }}>
          비밀번호 찾기
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

export default FindPasswordHeaderBlock;
