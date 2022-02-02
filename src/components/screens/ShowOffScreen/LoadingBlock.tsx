import { Colors } from "@constants";
import { Center, Spinner } from "native-base";
import React from "react";

const LoadingBlock = () => {
  return (
    <Center flex={1}>
      <Spinner color={Colors.black} size={"lg"} />
    </Center>
  );
};
export default LoadingBlock;
