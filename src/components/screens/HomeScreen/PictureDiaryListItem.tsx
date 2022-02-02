import { Colors, Dimension, Sizes, Spaces } from "@constants";
import { VStack, Image, Pressable } from "native-base";
import React from "react";
import LottieView from "lottie-react-native";
import { getAppDateStringFormatWith, getLottieSourceWith } from "@Utils";
import emptyPicture from "@assets/images/emptyPicture.png";
import StyledText from "@components/atoms/StyledText";
import StyledBoldText from "@components/atoms/StyledBoldText";

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
          alt={`${pictureDiary.title}`}
          key={pictureDiary.base64Img}
          source={
            pictureDiary.base64Img !== ""
              ? {
                  uri: pictureDiary.base64Img,
                }
              : emptyPicture
          }
          width={Dimension.window.width / (Dimension.isPad ? 4 : 2)}
          height={"32"}
          resizeMode="stretch"
        />
        <LottieView
          autoPlay={true}
          source={getLottieSourceWith(pictureDiary.weather)}
          style={{
            width: Dimension.window.width / (Dimension.isPad ? 16 : 8),
            height: Dimension.window.width / (Dimension.isPad ? 16 : 8),
            backgroundColor: "transparent",
            position: "absolute",
          }}
        />
        <VStack space={0.5} px={"0.5"}>
          <StyledText style={{ fontSize: Sizes.midText }}>
            {getAppDateStringFormatWith(pictureDiary.time)}
          </StyledText>
          <StyledBoldText style={{ fontSize: Sizes.midText }}>
            {pictureDiary.title}
          </StyledBoldText>
        </VStack>
      </Pressable>
    </VStack>
  );
};

export default PictureDiaryListItem;
