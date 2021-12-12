import React from "react";
import { HStack, IconButton, Icon, Text, Box, StatusBar } from "native-base";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Colors } from "@constants";

export const HeaderBlock = () => {
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
        <HStack space="4" alignItems="flex-start">
          <Text color="white" fontSize="20" fontWeight="bold"></Text>
          <IconButton
            icon={
              <Icon size="sm" as={<AntDesign name="down" />} color="white" />
            }
          />
        </HStack>
        <HStack space="2">
          <IconButton
            icon={
              <Icon as={<AntDesign name="plus" />} size="sm" color="white" />
            }
          />

          <IconButton
            icon={
              <Icon
                as={<MaterialIcons name="more-vert" />}
                size="sm"
                color="white"
              />
            }
          />
        </HStack>
      </HStack>
    </>
  );
};
