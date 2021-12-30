import { HStack, Spinner, Center, Image } from "native-base";
import React from "react";
import splashImg from "@assets/images/splash.png";

const SpinnerBlock = () => {
  return (
    <Center flex={1}>
      <HStack space={2} alignItems="center">
        {/* <Spinner size="lg" /> */}
        <Image source={splashImg} />
      </HStack>
    </Center>
  );
};

export default SpinnerBlock;
