import CustomAnimationView from "@components/atoms/CustomAnimationView";
import { UserState } from "@state";
import React from "react";
import { useRecoilValue } from "recoil";
import { RootTabScreenProps } from "types/navigation";
import SettingBlock from "./SettingBlock";
import SignInStateBlock from "./SignInStateBlock";
import SignOutStateBlock from "./SignOutStateBlock";
import UserHeaderBlock from "./UserHeaderBlock";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

const UserScreen = ({ navigation }: RootTabScreenProps<"User">) => {
  const user = useRecoilValue(UserState);

  const handleOnPressQuestionIconButton = () => {
    navigation.navigate("AppIntroduce");
  };

  const handleOnPressSettingBlock = () => {
    navigation.navigate("Setting");
  };

  const handleOnPressLogInButton = () => {
    navigation.navigate("SignIn");
  };

  const handleOnPressSignOutButton = () => {
    auth()
      .signOut()
      .then(() => {
        Alert.alert("로그아웃이 되었습니다.", "이용해주셔서 감사합니다.", [
          {
            text: "확인",
            style: "cancel",
          },
        ]);
      });
  };

  const handleOnPressBlockUserGroupButton = () => {
    navigation.navigate("BlockUserGroup");
  };

  return (
    <CustomAnimationView>
      <UserHeaderBlock
        handleOnPressQuestionIconButton={handleOnPressQuestionIconButton}
      />

      {/* login click block */}
      {user ? (
        <SignInStateBlock
          user={user}
          handleOnPressSignOutButton={handleOnPressSignOutButton}
          handleOnPressBlockUserGroupButton={handleOnPressBlockUserGroupButton}
        />
      ) : (
        <SignOutStateBlock
          handleOnPressLogInButton={handleOnPressLogInButton}
        />
      )}

      <SettingBlock handleOnPressSettingBlock={handleOnPressSettingBlock} />

      {/* setting block  */}
    </CustomAnimationView>
  );
};

export default UserScreen;
