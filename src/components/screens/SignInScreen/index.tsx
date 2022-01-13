import CustomAnimationView from "@components/atoms/CustomAnimationView";
import React from "react";
import { RootStackScreenProps } from "types/navigation";
import SignInBlock from "./SignInBlock";
import SignInHeaderBlock from "./SignInHeaderBlock";
import auth from "@react-native-firebase/auth";

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
        console.log(user);
      })
      .catch((error) => {
        if (error.code === "auth/operation-not-allowed") {
          console.log("Enable anonymous in your firebase console.");
        }

        console.error(error);
      });

    auth()
      .createUserWithEmailAndPassword(
        "jane.doe@example.com",
        "SuperSecretPassword!"
      )
      .then(() => {
        console.log("User account created & signed in!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
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
