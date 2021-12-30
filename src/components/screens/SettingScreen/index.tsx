import CustomView from "@components/atoms/CustomView";
import StyledText from "@components/atoms/StyledText";
import { HeaderBlock } from "@components/blocks/HeaderBlock";
import { Entypo, AntDesign } from "@expo/vector-icons";
import AuthService from "@service/auth_service";
import {
  Box,
  Button,
  Divider,
  Icon,
  IconButton,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useEffect } from "react";
import { RootStackScreenProps } from "types/navigation";

const SettingScreen = ({ navigation }: RootStackScreenProps<"Setting">) => {
  return (
    <CustomView>
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
      <VStack>
        <Pressable
          onPress={() => {
            navigation.navigate("AppIntroduce");
          }}
        >
          <Box p={"4"}>
            <StyledText style={{ textAlign: "right" }}>준비중이에여</StyledText>
          </Box>
        </Pressable>
        <Divider />
      </VStack>
    </CustomView>
  );
};

export default SettingScreen;
