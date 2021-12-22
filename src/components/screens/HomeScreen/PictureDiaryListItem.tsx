import { VStack, Image, Text, Pressable, Center } from "native-base";
import React from "react";

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
          size="10"
        />
        <Text>{pictureDiary.time}</Text>
        <Text>{pictureDiary.title}</Text>
      </Pressable>
    </VStack>
  );
};

export default PictureDiaryListItem;
