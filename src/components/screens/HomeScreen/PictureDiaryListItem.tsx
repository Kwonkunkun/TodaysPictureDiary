import { VStack, Image, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

type PictureDiaryListItemProps = {
  pictureDiary: PictureDiary;
};

const PictureDiaryListItem = ({ pictureDiary }: PictureDiaryListItemProps) => {
  return (
    <VStack flex={1}>
      <TouchableOpacity>
        <Image
          source={{
            uri: "https://wallpaperaccess.com/full/317501.jpg",
          }}
          size="10"
        />
        <Text>{pictureDiary.time}</Text>
        <Text>{pictureDiary.title}</Text>
      </TouchableOpacity>
    </VStack>
  );
};

export default PictureDiaryListItem;
