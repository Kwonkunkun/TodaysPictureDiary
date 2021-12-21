import MenuScriptBlock from "@components/blocks/MenuScriptBlock";
import PictureDiaryDetail from "@components/blocks/PictureDiaryDetail";
import { HomeHeaderBlock } from "@components/screens/HomeScreen/HomeHeaderBlock";
import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  HStack,
  Image,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { RootStackScreenProps } from "types/navigation";
import PictureDiaryListItem from "./PictureDiaryListItem";

const HomeScreen = ({ navigation }: RootStackScreenProps<"Home">) => {
  const [selectedTime, setSelectedTime] = useState(() => {
    let date = new Date();
    date.setDate(1);
    return date;
  });

  return (
    <>
      <HomeHeaderBlock
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />

      {/* <PictureDiaryDetail
        pictureDiary={{
          time: "2021년 04월 01일",
          weather: "sun",
          title: "집에 가고 싶어요",
          base64Img: "",
          content: "집에 가면 좋아요",
        }}
      /> */}
      <VStack>
        <HStack>
          <PictureDiaryListItem
            pictureDiary={{
              time: "2021년 04월 01일",
              weather: "sun",
              title: "집에 가고 싶어요",
              base64Img: "",
              content: "집에 가면 좋아요",
            }}
            handleOnPressItem={() => {
              navigation.navigate("Preview");
            }}
          />
          {/* <PictureDiaryListItem
            pictureDiary={{
              time: "2021년 04월 01일",
              weather: "sun",
              title: "집에 가고 싶어요",
              base64Img: "",
              content: "집에 가면 좋아요",
            }}
          /> */}
        </HStack>
      </VStack>
    </>
  );
};

export default HomeScreen;
