import CustomButton from "@components/atoms/CustomButton";
import CustomView from "@components/atoms/CustomView";
import StyledText from "@components/atoms/StyledText";
import { Sizes, Spaces } from "@constants";
import { Divider, HStack } from "native-base";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { BlockUser } from "types/user";

type BlockUserItemProps = {
  item: BlockUser;
  handleOnPressUnBlockButton: (uid: string) => void;
};

const BlockUserItem = ({
  item,
  handleOnPressUnBlockButton,
}: BlockUserItemProps) => {
  return (
    <CustomView style={{ backgroundColor: Colors.snow }}>
      <HStack
        backgroundColor={Colors.snow}
        p={Spaces.padding}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <StyledText style={{ fontSize: Sizes.smallText }}>
          {item.username}
        </StyledText>
        <CustomButton
          innerText="차단해제"
          handleOnPressButton={() => {
            handleOnPressUnBlockButton(item.uid);
          }}
        />
      </HStack>
    </CustomView>
  );
};

export default BlockUserItem;
