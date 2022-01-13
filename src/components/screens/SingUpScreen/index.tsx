import CustomAnimationView from "@components/atoms/CustomAnimationView";
import CustomButton from "@components/atoms/CustomButton";
import { Colors, Sizes, Spaces } from "@constants";
import { Checkbox, FormControl, HStack, Stack, Text } from "native-base";

import React, { useState } from "react";
import { Alert, Pressable } from "react-native";
import { RootStackScreenProps } from "types/navigation";
import SignUpHeaderBlock from "./SignUpHeaderBlock";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InValidCheckInput from "./InValidCheckInput";
import { isNotEmail, isNotPassword } from "@Utils";
import auth from "@react-native-firebase/auth";

const SignUpScreen = ({ navigation }: RootStackScreenProps<"SignIn">) => {
  const [checkTrigger, setValidCheckTrigger] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [isCheckPolicy, setIsCheckPolicy] = useState(false);

  const handleOnPressCloseButton = () => {
    navigation.goBack();
  };

  const isNotSamePassword = (text: string) => {
    return text !== password;
  };

  const onPressSignUpButton = () => {
    //check invalid
    if (
      isNotEmail(email) ||
      isNotPassword(password) ||
      isNotSamePassword(passwordCheck) ||
      name.length < 1 ||
      !isCheckPolicy
    ) {
      setValidCheckTrigger(true);
      return;
    }

    //sign up & sign in
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        response.user
          .updateProfile({ displayName: name })
          .then(() => {
            navigation.popToTop();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("아이디(이메일)가 존재해요!", "아이디를 변경해주세요.", [
            {
              text: "확인",
              style: "cancel",
            },
          ]);
        }

        if (error.code === "auth/invalid-email") {
          Alert.alert(
            "유효하지 않은 형식의 아이디이에요",
            "아이디를 변경해주세요.",
            [
              {
                text: "확인",
                style: "cancel",
              },
            ]
          );
        }
        console.error(error);
      });
  };

  return (
    <CustomAnimationView style={{ backgroundColor: Colors.snow }}>
      <SignUpHeaderBlock handleOnPressCloseButton={handleOnPressCloseButton} />
      <KeyboardAwareScrollView>
        <Stack flex={1} space={"2"} p={Spaces.padding}>
          <InValidCheckInput
            checkInValid={isNotEmail}
            checkTrigger={checkTrigger}
            label={"아이디"}
            text={email}
            setText={setEmail}
            placeholder={"goo@gmail.com"}
            errorMessage={"이메일 형식이 아닙니다."}
          />
          <InValidCheckInput
            checkInValid={isNotPassword}
            checkTrigger={checkTrigger}
            label={"비밀번호"}
            text={password}
            setText={setPassword}
            placeholder={"6글자 이상 입력해주세요."}
            errorMessage={"6자 이상이 아닙니다."}
            isMask={true}
          />
          <InValidCheckInput
            checkInValid={isNotSamePassword}
            checkTrigger={checkTrigger}
            label={"비밀번호 확인"}
            text={passwordCheck}
            setText={setPasswordCheck}
            placeholder={"6글자 이상 입력해주세요."}
            errorMessage={"비밀번호가 다릅니다."}
            isMask={true}
          />
          <InValidCheckInput
            checkInValid={(text: string) => {
              return text.length < 1;
            }}
            checkTrigger={checkTrigger}
            label={"이름"}
            text={name}
            setText={setName}
            placeholder={"1글자 이상 입력해주세요."}
            errorMessage={"1글자 이상 입력해주세요."}
          />

          <HStack justifyContent={"space-between"} marginTop={Spaces.top}>
            <FormControl isInvalid={!isCheckPolicy} w={"70%"}>
              <Checkbox value="agree" onChange={setIsCheckPolicy}>
                <Text paddingLeft="2">개인정보 수집 및 이용 (필수)</Text>
              </Checkbox>
            </FormControl>
            <Pressable onPress={() => {}}>
              <Text style={{ color: Colors.gray }}>내용 확인</Text>
            </Pressable>
          </HStack>
          <CustomButton
            innerText="회원가입"
            handleOnPressButton={onPressSignUpButton}
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
