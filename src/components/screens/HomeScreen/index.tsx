import MenuScriptBlock from "@components/blocks/MenuScriptBlock";
import PictureDiary from "@components/blocks/PictureDiary";
import { HomeHeaderBlock } from "@components/screens/HomeScreen/HomeHeaderBlock";
import {
  Center,
  Container,
  Divider,
  Flex,
  HStack,
  Image,
  VStack,
} from "native-base";
import React, { useState } from "react";

type HomeScreenProps = {};

const HomeScreen = ({}: HomeScreenProps) => {
  const [selectedTime, setSelectedTime] = useState(() => {
    let date = new Date();
    date.setDate(1);
    return date;
  });

  const dummyString = "display the same for all devices";
  return (
    <>
      <HomeHeaderBlock
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />

      <PictureDiary
        pictureDiary={{
          time: "2021년 04월 01일",
          weather: "sun",
          title: "집에 가고 싶어요",
          base64Img: "",
          content: "집에 가면 좋아요",
        }}
      />
    </>
  );
};

export default HomeScreen;
