import CustomButton from "@components/atoms/CustomButton";
import StyledText from "@components/atoms/StyledText";
import { Colors, Sizes, Spaces } from "@constants";
import { HStack } from "native-base";
import React from "react";

const SignOutStateBlock = () => {
  return (
    <HStack
      backgroundColor={Colors.header}
      p={Spaces.padding}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <StyledText style={{ fontSize: Sizes.bigText }}>
        로그인이 필요해요.
      </StyledText>
      <CustomButton innerText="로그인" handleOnPressButton={() => {}} />
    </HStack>
  );
};

export default SignOutStateBlock;
