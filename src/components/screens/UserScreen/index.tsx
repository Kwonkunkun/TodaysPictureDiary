import CustomAnimationView from "@components/atoms/CustomAnimationView";
import React from "react";
import { RootTabScreenProps } from "types/navigation";
import SettingBlock from "./SettingBlock";
import SignOutStateBlock from "./SignOutStateBlock";
import UserHeaderBlock from "./UserHeaderBlock";

const UserScreen = ({ navigation }: RootTabScreenProps<"User">) => {
  const handleOnPressQuestionIconButton = () => {
    navigation.navigate("AppIntroduce");
  };

  const handleOnPressSettingBlock = () => {
    navigation.navigate("Setting");
  };

  const handleOnPressLogInButton = () => {
    navigation.navigate("SignIn");
  };

  return (
    <CustomAnimationView>
      <UserHeaderBlock
        handleOnPressQuestionIconButton={handleOnPressQuestionIconButton}
      />

      {/* login click block */}
      <SignOutStateBlock handleOnPressLogInButton={handleOnPressLogInButton} />

      <SettingBlock handleOnPressSettingBlock={handleOnPressSettingBlock} />

      {/* setting block  */}
    </CustomAnimationView>
  );
};

export default UserScreen;
