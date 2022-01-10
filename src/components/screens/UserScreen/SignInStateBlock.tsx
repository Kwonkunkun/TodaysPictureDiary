import CustomButton from "@components/atoms/CustomButton";
import StyledText from "@components/atoms/StyledText";
import { Colors, Sizes, Spaces } from "@constants";
import { HStack } from "native-base";
import React from "react";

type SignInStateBlockProps = {};

const SignInStateBlock = ({}: SignInStateBlockProps) => {
  return (
    <HStack
      backgroundColor={Colors.header}
      p={Spaces.padding}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <StyledText style={{ fontSize: Sizes.bigText }}>사용자님</StyledText>
      <CustomButton innerText="로그아웃" handleOnPressButton={() => {}} />
    </HStack>
  );
};

export default SignInStateBlock;
