import { HeaderBlock } from "@components/blocks/HeaderBlock";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Icon, IconButton } from "native-base";
import React, { memo } from "react";

type CreateAndEditDiaryHeaderBlockProps = {
  handleOnPressBackIconButton: () => void;
  handleOnPressCheckIconButton: () => void;
};

const CreateAndEditDiaryHeaderBlock = ({
  handleOnPressBackIconButton,
  handleOnPressCheckIconButton,
}: CreateAndEditDiaryHeaderBlockProps) => {
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
      rightComponent={
        <IconButton
          icon={
            <Icon as={<MaterialIcons name="check" />} size="sm" color="white" />
          }
          onPress={handleOnPressCheckIconButton}
        />
      }
    />
  );
};

export default memo(CreateAndEditDiaryHeaderBlock);
