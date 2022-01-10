import CustomAnimationView from "@components/atoms/CustomAnimationView";
import CustomButton from "@components/atoms/CustomButton";
import StyledBoldText from "@components/atoms/StyledBoldText";
import { HeaderBlock } from "@components/blocks/HeaderBlock";
import { Colors, Sizes, Spaces } from "@constants";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Button,
  FormControl,
  Icon,
  IconButton,
  Input,
  Stack,
  WarningOutlineIcon,
} from "native-base";

import React from "react";
import { RootStackScreenProps } from "types/navigation";
import SignInHeaderBlock from "./SignInHeaderBlock";

const SignInScreen = ({ navigation }: RootStackScreenProps<"SignIn">) => {
  const handleOnPressCloseButton = () => {
    navigation.goBack();
  };

  const handleOnPressSignUpButton = () => {
    navigation.navigate("SignUp");
  };

  return (
    <CustomAnimationView>
      <SignInHeaderBlock handleOnPressCloseButton={handleOnPressCloseButton} />

      <Stack space={0} w="100%" alignItems="center" p={Spaces.padding}>
        <Input
          borderBottomLeftRadius={"none"}
          borderBottomRightRadius={"none"}
          bg={Colors.white}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="email" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder="Email"
          fontSize={Sizes.bigText}
          fontFamily={"young-child-bold"}
        />
        <Input
          borderTopLeftRadius={"none"}
          borderTopRightRadius={"none"}
          bg={Colors.white}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="vpn-key" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          InputRightElement={
            <Icon
              as={<MaterialIcons name="visibility-off" />}
              size={5}
              mr="2"
              color="muted.400"
            />
          }
          type="password"
          placeholder="Password"
          fontSize={Sizes.bigText}
          fontFamily={"young-child-bold"}
        />
        <Button variant="ghost" alignSelf={"flex-end"}>
          <StyledBoldText
            style={{ fontSize: Sizes.smallText, color: Colors.gray }}
          >
            비밀번호 찾기
          </StyledBoldText>
        </Button>

        <CustomButton
          innerText="로그인"
          handleOnPressButton={() => {}}
          style={{
            width: "100%",
          }}
        />

        <Button
          variant="ghost"
          alignSelf={"flex-end"}
          onPress={handleOnPressSignUpButton}
        >
          <StyledBoldText
            style={{ fontSize: Sizes.smallText, color: Colors.gray }}
          >
            아직 회원이 아니신가요? 회원가입
          </StyledBoldText>
        </Button>
      </Stack>
    </CustomAnimationView>
  );
};

export default SignInScreen;
