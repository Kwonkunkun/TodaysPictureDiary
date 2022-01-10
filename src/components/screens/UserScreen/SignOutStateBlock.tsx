import CustomButton from "@components/atoms/CustomButton";
import StyledText from "@components/atoms/StyledText";
import { Colors, Sizes, Spaces } from "@constants";
import { GOOGLE_ANDROID_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from "@env";
import { HStack } from "native-base";
import React, { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Platform } from "react-native";

GoogleSignin.configure({
  webClientId:
    Platform.OS == "android" ? GOOGLE_ANDROID_CLIENT_ID : GOOGLE_IOS_CLIENT_ID,
});

type SignOutStateBlockProps = {
  handleOnPressLogInButton: () => void;
};

const SignOutStateBlock = ({
  handleOnPressLogInButton,
}: SignOutStateBlockProps) => {
  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <HStack
      backgroundColor={Colors.header}
      p={Spaces.padding}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <StyledText style={{ fontSize: Sizes.midText }}>
        로그인이 필요해요.
      </StyledText>

      <CustomButton
        innerText="로그인"
        handleOnPressButton={() => {
          handleOnPressLogInButton();
          // onGoogleButtonPress()
          //   .then((result) => console.log(result.user.displayName))
          //   .catch((error) => console.log(error));
        }}
      />
    </HStack>
  );
};

export default SignOutStateBlock;
