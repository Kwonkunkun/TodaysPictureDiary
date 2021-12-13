import React, { ReactElement } from "react";
import { HStack, Box, StatusBar } from "native-base";
import { Colors } from "@constants";

/**
 * HeaderBlock
 * leftcomponent
 * rightcomponent
 */

type HeaderBlockProps = {
  leftComponent?: ReactElement;
  rightComponent?: ReactElement;
};

export const HeaderBlock = ({
  leftComponent,
  rightComponent,
}: HeaderBlockProps) => {
  return (
    <>
      <StatusBar backgroundColor={Colors.background} barStyle="light-content" />
      <Box safeAreaTop backgroundColor={Colors.background} />
      <HStack
        bg={Colors.background}
        px="1"
        py="1"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack>{leftComponent}</HStack>
        <HStack>{rightComponent}</HStack>
      </HStack>
    </>
  );
};
