import CustomAnimationView from "@components/atoms/CustomAnimationView";
import CustomButton from "@components/atoms/CustomButton";
import StyledBoldText from "@components/atoms/StyledBoldText";
import { HeaderBlock } from "@components/blocks/HeaderBlock";
import { Colors, Sizes, Spaces } from "@constants";
import { Entypo } from "@expo/vector-icons";
import {
  Button,
  Checkbox,
  FormControl,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
  WarningOutlineIcon,
} from "native-base";

import React from "react";
import { Pressable } from "react-native";
import { RootStackScreenProps } from "types/navigation";
import SignUpHeaderBlock from "./SignUpHeaderBlock";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignUpScreen = ({ navigation }: RootStackScreenProps<"SignIn">) => {
  const handleOnPressCloseButton = () => {
    navigation.goBack();
  };

  return (
    <CustomAnimationView style={{ backgroundColor: Colors.snow }}>
      <SignUpHeaderBlock handleOnPressCloseButton={handleOnPressCloseButton} />
      <KeyboardAwareScrollView>
        <Stack flex={1} space={"2"} p={Spaces.padding}>
          <FormControl>
            <Stack>
              <FormControl.Label>아이디</FormControl.Label>
              <Input defaultValue="12345" placeholder="password" />
              <FormControl.HelperText>
                이메일 형식으로 입력해주세요
              </FormControl.HelperText>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                이메일 형식이 아닙니다.
              </FormControl.ErrorMessage>
            </Stack>
          </FormControl>
          <FormControl isInvalid>
            <Stack>
              <FormControl.Label>비밀번호</FormControl.Label>
              <Input
                type="password"
                defaultValue="12345"
                placeholder="password"
              />
              <FormControl.HelperText>
                4글자 이상 입력해주세요
              </FormControl.HelperText>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                4자 이상이 아닙니다.
              </FormControl.ErrorMessage>
            </Stack>
          </FormControl>
          <FormControl isInvalid>
            <Stack>
              <FormControl.Label>비밀번호 확인</FormControl.Label>
              <Input
                type="password"
                defaultValue="12345"
                placeholder="password"
              />
              <FormControl.HelperText></FormControl.HelperText>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                비밀번호가 다릅니다.
              </FormControl.ErrorMessage>
            </Stack>
          </FormControl>
          <FormControl>
            <Stack>
              <FormControl.Label>이름</FormControl.Label>
              <Input defaultValue="12345" placeholder="password" />
            </Stack>
          </FormControl>
          <HStack justifyContent={"space-between"} marginTop={Spaces.top}>
            <Checkbox value="agree">
              <Text paddingLeft="2">개인정보 수집 및 이용 (필수)</Text>
            </Checkbox>
            <Pressable onPress={() => {}}>
              <Text style={{ color: Colors.gray }}>내용 확인</Text>
            </Pressable>
          </HStack>
          <CustomButton
            innerText="회원가입"
            handleOnPressButton={() => {}}
            style={{
              width: "100%",
            }}
          />
        </Stack>
      </KeyboardAwareScrollView>
    </CustomAnimationView>
  );
};

export default SignUpScreen;
