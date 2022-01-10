import CustomAnimationView from "@components/atoms/CustomAnimationView";
import CustomView from "@components/atoms/CustomView";
import React from "react";
import { RootTabScreenProps } from "types/navigation";

const ShowOffScreen = ({ navigation }: RootTabScreenProps<"ShowOff">) => {
  return <CustomAnimationView></CustomAnimationView>;
};

export default ShowOffScreen;
