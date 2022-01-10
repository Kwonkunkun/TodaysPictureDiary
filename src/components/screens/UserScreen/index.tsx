import CustomAnimationView from "@components/atoms/CustomAnimationView";
import CustomView from "@components/atoms/CustomView";
import React from "react";
import { RootTabScreenProps } from "types/navigation";

const UserScreen = ({ navigation }: RootTabScreenProps<"User">) => {
  return <CustomAnimationView></CustomAnimationView>;
};

export default UserScreen;
