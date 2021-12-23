import { Colors, Dimension, Sizes, Spaces } from "@constants";
import { VStack, Image, Text, Pressable, Center, HStack } from "native-base";
import React from "react";
import LottieView from "lottie-react-native";
import { ColorPicker } from "react-native-color-picker";
import { getAppDateStringFormatWith } from "@Utils";

type PictureDiaryListItemProps = {
  pictureDiary: PictureDiary;
  handleOnPressItem: () => void;
};

const PictureDiaryListItem = ({
  pictureDiary,
  handleOnPressItem,
}: PictureDiaryListItemProps) => {
  return (
    <VStack flex={1} alignItems={"center"} p={"2"}>
      <Pressable onPress={handleOnPressItem}>
        <Image
          source={{
            uri: "https://wallpaperaccess.com/full/317501.jpg",
          }}
          width={Dimension.window.width / 2}
          height={"40"}
          resizeMode="contain"
        />
        <LottieView
          autoPlay={true}
          source={lottieGroup[0].source}
          style={{
            width: Dimension.window.width / 8,
            height: Dimension.window.width / 8,
            backgroundColor: "transparent",
            position: "absolute",
            top: 3,
          }}
        />
        <VStack space={0.5} px={"0.5"}>
          <Text fontSize={Sizes.smallText}>
            {getAppDateStringFormatWith(pictureDiary.time)}
          </Text>
          <Text fontSize={Sizes.midText} fontWeight={"semibold"}>
            {pictureDiary.title}
          </Text>
        </VStack>
      </Pressable>
    </VStack>
  );
};

export default PictureDiaryListItem;

const lottieGroup = [
  { title: "sun", source: require("../../../../assets/lotties/sun.json") },
  {
    title: "cloud",
    source: require("../../../../assets/lotties/cloud.json"),
  },
  { title: "rain", source: require("../../../../assets/lotties/rain.json") },
  { title: "snow", source: require("../../../../assets/lotties/snow.json") },
];
