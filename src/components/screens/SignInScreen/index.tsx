import CustomAnimationView from "@components/atoms/CustomAnimationView";
import React from "react";
import { RootStackScreenProps } from "types/navigation";
import SignInBlock from "./SignInBlock";
import SignInHeaderBlock from "./SignInHeaderBlock";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

const SignInScreen = ({ navigation }: RootStackScreenProps<"SignIn">) => {
  const handleOnPressCloseButton = () => {
    navigation.goBack();
  };

  const handleOnPressFindPasswordButton = () => {
    console.log("handleOnPressFindPasswordButton");
  };

  const handleOnPressSignInButton = (email: string, password: string) => {
    //firebase 로그인
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        //여기서 처리해줄건 없음, app.tsx에서 listen 중
        navigation.goBack();
      })
      .catch((error) => {
        if (error.code === "auth/operation-not-allowed") {
          Alert.alert("서버에러 입니다.", "에러상황 문의 바랍니다.", [
            {
              text: "확인",
              style: "cancel",
            },
          ]);
        }

        if (error.code === "auth/invalid-email") {
          Alert.alert(
            "유효하지 않은 아이디입니다.",
            "아이디를 다시 입력해주세요.",
            [
              {
                text: "확인",
                style: "cancel",
              },
            ]
          );
        }

        if (error.code === "auth/user-not-found") {
          Alert.alert("해당 유저는 없습니다.", "다시 시도해주세요.", [
            {
              text: "확인",
              style: "cancel",
            },
          ]);
        }

        if (error.code === "auth/wrong-password") {
          Alert.alert("비밀번호가 틀렸습니다.", "다시 시도해주세요.", [
            {
              text: "확인",
              style: "cancel",
            },
          ]);
        }

        console.error(error);
      });
  };

  const handleOnPressSignUpButton = () => {
    navigation.navigate("SignUp");
  };

  return (
    <CustomAnimationView>
      <SignInHeaderBlock handleOnPressCloseButton={handleOnPressCloseButton} />
      <SignInBlock
        handleOnPressFindPasswordButton={handleOnPressFindPasswordButton}
        handleOnPressSignInButton={handleOnPressSignInButton}
        handleOnPressSignUpButton={handleOnPressSignUpButton}
      />
    </CustomAnimationView>
  );
};

export default SignInScreen;
