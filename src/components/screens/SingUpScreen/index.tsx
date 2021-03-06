import CustomAnimationView from "@components/atoms/CustomAnimationView";
import CustomButton from "@components/atoms/CustomButton";
import { Colors, Sizes, Spaces } from "@constants";
import {
  Checkbox,
  FormControl,
  HStack,
  Stack,
  Text,
  WarningOutlineIcon,
} from "native-base";

import React, { useState } from "react";
import { Alert, Linking, Pressable } from "react-native";
import { RootStackScreenProps } from "types/navigation";
import SignUpHeaderBlock from "./SignUpHeaderBlock";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InValidCheckInput from "./InValidCheckInput";
import { isNotEmail, isNotPassword } from "@Utils";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

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
    /**
     * @error auth/email-already-in-use Thrown if there already exists an account with the given email address.
     * @error auth/invalid-email Thrown if the email address is not valid.
     * @error auth/operation-not-allowed Thrown if email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.
     * @error auth/weak-password Thrown if the password is not strong enough
     */
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
          Alert.alert("?????????(?????????)??? ????????????!", "???????????? ??????????????????.", [
            {
              text: "??????",
              style: "cancel",
            },
          ]);
        }

        if (error.code === "auth/invalid-email") {
          Alert.alert(
            "???????????? ?????? ????????? ??????????????????",
            "???????????? ??????????????????.",
            [
              {
                text: "??????",
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
            autoFocus={true}
            checkInValid={isNotEmail}
            checkTrigger={checkTrigger}
            label={"?????????"}
            text={email}
            setText={setEmail}
            placeholder={"goo@gmail.com"}
            errorMessage={"????????? ????????? ????????????."}
            helperText={
              "????????? ????????? ????????? ???????????????.(???????????? ????????? ??????)"
            }
          />
          <InValidCheckInput
            checkInValid={isNotPassword}
            checkTrigger={checkTrigger}
            label={"????????????"}
            text={password}
            setText={setPassword}
            placeholder={"6?????? ?????? ??????????????????."}
            errorMessage={"6??? ????????? ????????????."}
            isMask={true}
          />
          <InValidCheckInput
            checkInValid={isNotSamePassword}
            checkTrigger={checkTrigger}
            label={"???????????? ??????"}
            text={passwordCheck}
            setText={setPasswordCheck}
            placeholder={"6?????? ?????? ??????????????????."}
            errorMessage={"??????????????? ????????????."}
            isMask={true}
          />
          <InValidCheckInput
            checkInValid={(text: string) => {
              return text.length < 1;
            }}
            checkTrigger={checkTrigger}
            label={"??????"}
            text={name}
            setText={setName}
            placeholder={"1~4?????? ??????????????????."}
            errorMessage={"1~4?????? ??????????????????."}
            maxLength={4}
          />

          <HStack justifyContent={"space-between"} marginTop={Spaces.top}>
            <FormControl isInvalid={!isCheckPolicy} w={"70%"}>
              <Checkbox value="agree" onChange={setIsCheckPolicy}>
                <Text paddingLeft="2">???????????? ?????? ??? ?????? (??????)</Text>
              </Checkbox>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                ???????????? ?????? ??? ????????? ??????????????????
              </FormControl.ErrorMessage>
            </FormControl>
            <Pressable
              onPress={() => {
                Linking.openURL("https://keen-mestorf-af2db2.netlify.app");
              }}
            >
              <Text style={{ color: Colors.gray }}>?????? ??????</Text>
            </Pressable>
          </HStack>
          <CustomButton
            innerText="????????????"
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
