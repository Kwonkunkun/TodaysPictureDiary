import CustomButton from "@components/atoms/CustomButton";
import StyledText from "@components/atoms/StyledText";
import { Colors, Sizes, Spaces } from "@constants";
import { Entypo } from "@expo/vector-icons";
import { HStack, Icon, Pressable, VStack } from "native-base";
import React from "react";
import { User } from "types/user";

type SignInStateBlockProps = {
  user: User;
  handleOnPressSignOutButton: () => void;
  handleOnPressBlockUserGroupButton: () => void;
};

const SignInStateBlock = ({
  user,
  handleOnPressSignOutButton,
  handleOnPressBlockUserGroupButton: handleOnPressBlockUserListButton,
}: SignInStateBlockProps) => {
  return (
    <VStack>
      <HStack
        backgroundColor={Colors.header}
        p={Spaces.padding}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <StyledText style={{ fontSize: Sizes.midText }}>
          {user.displayName}
        </StyledText>
        <CustomButton
          innerText="로그아웃"
          handleOnPressButton={handleOnPressSignOutButton}
        />
      </HStack>
      <Pressable onPress={handleOnPressBlockUserListButton}>
        <HStack
          paddingLeft={Spaces.padding}
          paddingRight={"3"}
          py="2"
          backgroundColor={Colors.header}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <StyledText style={{ fontSize: Sizes.bigText }}>
            차단한 사용자 목록
          </StyledText>
          <Icon as={<Entypo name="chevron-right" />} size="sm" color="white" />
        </HStack>
      </Pressable>
    </VStack>
  );
};

export default SignInStateBlock;
