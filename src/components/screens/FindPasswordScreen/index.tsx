import CustomAnimationView from "@components/atoms/CustomAnimationView";
import CustomButton from "@components/atoms/CustomButton";
import { Colors, Spaces } from "@constants";
import { FormControl, Input, Stack } from "native-base";
import React, { useState } from "react";
import { RootStackScreenProps } from "types/navigation";
import FindPasswordHeaderBlock from "./FindPasswordHeaderBlock";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

/**
 * FindPasswordScreen
 * 프로세스
 * 1. email 입력
 * 2. email이 존재하는지 확인
 * 3. 비밀번호 변경 이메일 발송
 */

const FindPasswordScreen = ({
  navigation,
}: RootStackScreenProps<"FindPassword">) => {
  const [text, setText] = useState("");

  const handleOnPressCloseButton = () => {
    navigation.goBack();
  };

  const handleOnPressFindButton = () => {
    //text가 비어있을 경우
    if (text === "") {
      return;
    }

    /**
     * @error auth/invalid-email Thrown if the email address is not valid.
     * @error auth/missing-android-pkg-name An Android package name must be provided if the Android app is required to be installed.
     * @error auth/missing-continue-uri A continue URL must be provided in the request.
     * @error auth/missing-ios-bundle-id An iOS Bundle ID must be provided if an App Store ID is provided.
     * @error auth/invalid-continue-uri The continue URL provided in the request is invalid.
     * @error auth/unauthorized-continue-uri The domain of the continue URL is not whitelisted. Whitelist the domain in the Firebase console.
     * @error auth/user-not-found Thrown if there is no user corresponding to the email address.
     */
    auth()
      .sendPasswordResetEmail(text)
      .then(() => {
        Alert.alert("메일 보내기 성공", `${text}의 메일함을 확인해주세요`, [
          {
            text: "확인",
            style: "cancel",
            onPress: handleOnPressCloseButton,
          },
        ]);
      })
      .catch((error) => {});
  };

  return (
    <CustomAnimationView style={{ backgroundColor: Colors.snow }}>
      <FindPasswordHeaderBlock
        handleOnPressCloseButton={handleOnPressCloseButton}
      />
      <Stack flex={1} space={"2"} p={Spaces.padding}>
        <FormControl>
          <Stack>
            <Input
              autoFocus
              placeholder={"이메일(아이디)를 입력해주세요."}
              onChangeText={setText}
            />

            <FormControl.HelperText>
              해당 이메일로 비밀번호를 변경할수있는 메일이 전송됩니다.
            </FormControl.HelperText>
          </Stack>
        </FormControl>
        <CustomButton
          innerText="찾기"
          handleOnPressButton={handleOnPressFindButton}
          style={{
            width: "100%",
          }}
        />
      </Stack>
    </CustomAnimationView>
  );
};

export default FindPasswordScreen;
