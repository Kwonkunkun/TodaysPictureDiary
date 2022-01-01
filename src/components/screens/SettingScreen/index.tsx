import CustomView from "@components/atoms/CustomView";
import StyledBoldText from "@components/atoms/StyledBoldText";
import StyledText from "@components/atoms/StyledText";
import { HeaderBlock } from "@components/blocks/HeaderBlock";
import { Colors, Sizes } from "@constants";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { Box, Divider, Icon, IconButton, Pressable, VStack } from "native-base";
import React from "react";
import { Linking, Share, View } from "react-native";
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
          <Divider />
        </Pressable>
        <Pressable
          onPress={() => {
            Linking.openURL("https://github.com/Kwonkunkun/TodaysPictureDiary");
          }}
        >
          <Box p={"4"}>
            <StyledText style={{ textAlign: "right" }}>코드 repo</StyledText>
          </Box>
          <Divider />
        </Pressable>
      </VStack>
    </CustomView>
  );
};

// const ShareExample = () => {
//   const onShare = async () => {
//     try {
//       const result = await Share.share({
//         title: "공유",
//         message: "내 그림일기를 자랑해보세요!",
//       });
//       if (result.action === Share.sharedAction) {
//         if (result.activityType) {
//           // shared with activity type of result.activityType
//         } else {
//           // shared
//         }
//       } else if (result.action === Share.dismissedAction) {
//         // dismissed
//       }
//     } catch (error) {
//       // alert(error.message);
//     }
//   };
//   return (
//     <View style={{ marginTop: 50 }}>
//       <Button onPress={onShare} />
//     </View>
//   );
// };

export default SettingScreen;
