import CustomView from "@components/atoms/CustomView";
import StyledBoldText from "@components/atoms/StyledBoldText";
import StyledText from "@components/atoms/StyledText";
import { HeaderBlock } from "@components/blocks/HeaderBlock";
import { Colors, Sizes } from "@constants";
import { Entypo, AntDesign } from "@expo/vector-icons";
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
import { Linking } from "react-native";
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
        centerComponent={
          <StyledBoldText style={{ fontSize: Sizes.bigText, color: "green" }}>
            설정
          </StyledBoldText>
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
        <Pressable onPress={() => {}}>
          <Box p={"4"}>
            <StyledText style={{ textAlign: "right" }}>준비중이에요</StyledText>
          </Box>
        </Pressable>
        <Pressable
          onPress={() => {
            Linking.openURL("https://github.com/Kwonkunkun/TodaysPictureDiary");
          }}
        >
          <Box p={"4"}>
            <StyledText style={{ textAlign: "right" }}>코드 repo</StyledText>
          </Box>
        </Pressable>
        <Divider />
      </VStack>
    </CustomView>
  );
};

export default SettingScreen;
