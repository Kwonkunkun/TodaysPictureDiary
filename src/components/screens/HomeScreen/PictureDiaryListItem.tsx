import { Colors, Dimension, Sizes, Spaces } from "@constants";
import { VStack, Image, Text, Pressable, Center, HStack } from "native-base";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { ColorPicker } from "react-native-color-picker";
import { getAppDateStringFormatWith, getLottieSourceWith } from "@Utils";
import emptyPicture from "@assets/images/emptyPicture.png";

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
          source={
            pictureDiary.base64Img !== ""
              ? {
                  uri: pictureDiary.base64Img,
                }
              : emptyPicture
          }
          width={Dimension.window.width / 2}
          height={"32"}
          resizeMode="stretch"
        />
        <LottieView
          autoPlay={true}
          source={getLottieSourceWith(pictureDiary.weather)}
          style={{
            width: Dimension.window.width / 8,
            height: Dimension.window.width / 8,
            backgroundColor: "transparent",
            position: "absolute",
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
