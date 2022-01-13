import CustomButton from "@components/atoms/CustomButton";
import StyledText from "@components/atoms/StyledText";
import { Colors, Sizes, Spaces } from "@constants";
import { HStack } from "native-base";
import React from "react";
import { User } from "types/user";

type SignInStateBlockProps = {
  user: User;
  handleOnPressSignOutButton: () => void;
};

const SignInStateBlock = ({
  user,
  handleOnPressSignOutButton,
}: SignInStateBlockProps) => {
  return (
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
  );
};

export default SignInStateBlock;
