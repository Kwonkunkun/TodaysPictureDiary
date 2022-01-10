import StyledText from "@components/atoms/StyledText";
import { Colors, Sizes, Spaces } from "@constants";
import { Entypo } from "@expo/vector-icons";
import { HStack, Icon, Pressable } from "native-base";
import React from "react";

type SettingBlockProps = {
  handleOnPressSettingBlock: () => void;
};

const SettingBlock = ({ handleOnPressSettingBlock }: SettingBlockProps) => {
  return (
    <Pressable onPress={handleOnPressSettingBlock}>
      <HStack
        my={"2"}
        paddingLeft={Spaces.padding}
        paddingRight={"3"}
        py="2"
        backgroundColor={Colors.header}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <StyledText style={{ fontSize: Sizes.bigText }}>설정</StyledText>
        <Icon as={<Entypo name="chevron-right" />} size="sm" color="white" />
      </HStack>
    </Pressable>
  );
};

export default SettingBlock;
