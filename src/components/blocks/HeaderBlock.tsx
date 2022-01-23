import React, { ReactElement } from "react";
import { HStack, Box, StatusBar } from "native-base";
import { Colors } from "@constants";
import StyledText from "@components/atoms/StyledText";

/**
 * HeaderBlock
 * leftcomponent
 * rightcomponent
 */

type HeaderBlockProps = {
  leftComponent?: ReactElement;
  centerComponent?: ReactElement;
  rightComponent?: ReactElement;
};

export const HeaderBlock = ({
  leftComponent,
  centerComponent,
  rightComponent,
}: HeaderBlockProps) => {
  return (
    <>
      <StatusBar backgroundColor={Colors.header} barStyle="light-content" />
      <Box safeAreaTop backgroundColor={Colors.header} />
      <HStack
        bg={Colors.header}
        px="1"
        py="1"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack flex={1} justifyContent={"flex-start"}>
          {leftComponent}
        </HStack>
        <HStack flex={1} justifyContent={"center"}>
          {centerComponent}
        </HStack>
        <HStack flex={1} justifyContent={"flex-end"}>
          {rightComponent}
        </HStack>
      </HStack>
    </>
  );
};
