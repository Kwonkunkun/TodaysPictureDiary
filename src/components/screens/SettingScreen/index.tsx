import { HeaderBlock } from "@components/blocks/HeaderBlock";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { Button, Icon, IconButton, Image, Text } from "native-base";
import React, { useEffect } from "react";
import { RootStackScreenProps } from "types/navigation";

const SettingScreen = ({ navigation }: RootStackScreenProps<"Setting">) => {
  return (
    <>
      <HeaderBlock
        leftComponent={
          <IconButton
            icon={
              <Icon
                as={<Entypo name="chevron-left" />}
                size="sm"
                color="white"
              />
            }
            onPress={() => {
              navigation.goBack();
            }}
          />
        }
        rightComponent={
          <IconButton
            icon={
              <Icon
                as={<AntDesign name="question" />}
                size="sm"
                color="white"
              />
            }
            onPress={() => {
              navigation.navigate("AppIntroduce");
            }}
          />
        }
      />
    </>
  );
};

export default SettingScreen;
