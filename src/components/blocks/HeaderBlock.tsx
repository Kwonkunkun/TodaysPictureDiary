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
  rightComponent?: ReactElement;
};

export const HeaderBlock = ({
  leftComponent,
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
        <HStack>{leftComponent}</HStack>
        <HStack>{rightComponent}</HStack>
      </HStack>
    </>
  );
};
