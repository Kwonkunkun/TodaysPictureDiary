import { HeaderBlock } from "@components/blocks/HeaderBlock";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Icon, IconButton } from "native-base";
import React, { memo } from "react";
import StyledBoldText from "@components/atoms/StyledBoldText";
import { Sizes } from "@constants";

type BlockUserGroupHeaderBlockProps = {
  handleOnPressBackIconButton: () => void;
};

const BlockUserGroupHeaderBlock = ({
  handleOnPressBackIconButton,
}: BlockUserGroupHeaderBlockProps) => {
  return (
    <HeaderBlock
      leftComponent={
        <IconButton
          icon={
            <Icon as={<Entypo name="chevron-left" />} size="sm" color="white" />
          }
          onPress={handleOnPressBackIconButton}
        />
      }
      centerComponent={
        <StyledBoldText style={{ fontSize: Sizes.bigText }}>
          차단한 사용자 목록
        </StyledBoldText>
      }
    />
  );
};

export default memo(BlockUserGroupHeaderBlock);
