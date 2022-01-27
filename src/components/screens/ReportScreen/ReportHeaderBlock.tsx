import StyledBoldText from "@components/atoms/StyledBoldText";
import { HeaderBlock } from "@components/blocks/HeaderBlock";
import { Sizes } from "@constants";
import { Button } from "native-base";
import React from "react";

type ReportHeaderBlockProps = {
  handleOnPressCloseButton: () => void;
};

const ReportHeaderBlock = ({
  handleOnPressCloseButton,
}: ReportHeaderBlockProps) => {
  return (
    <HeaderBlock
      centerComponent={
        <StyledBoldText style={{ fontSize: Sizes.bigText }}>
          신고하기
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

export default ReportHeaderBlock;
