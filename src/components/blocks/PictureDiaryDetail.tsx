import React, { useState } from "react";
import {
  Center,
  Container,
  Divider,
  HStack,
  Image,
  Input,
  Pressable,
  TextArea,
  VStack,
} from "native-base";
import MenuScriptBlock from "@components/blocks/MenuScriptBlock";

type PictureDiaryDetailProps = {
  isEdit?: boolean;
  pictureDiary: PictureDiary;
  handleOnPressTime?: () => void;
  handleOnPressWeather?: () => void;
  handleOnChangeInputTitle?: (text: string) => void;
  handleOnPressImage?: () => void;
  handleOnPressMenuScript?: () => void;
};

const PictureDiaryDetail = ({
  isEdit = false,
  pictureDiary,
  handleOnPressTime,
  handleOnPressWeather,
  handleOnChangeInputTitle,
  handleOnPressImage,
  handleOnPressMenuScript,
}: PictureDiaryDetailProps) => {
  return (
    <>
      <VStack borderWidth={0.3}>
        {/* 날짜, 날씨 */}
        <HStack divider={<Divider bg="black" />}>
          <Pressable
            flexDirection="row"
            flex={4}
            onPress={() => {
              isEdit && handleOnPressTime && handleOnPressTime();
            }}
          >
            <Center
              style={{ borderBottomWidth: 0.5, borderRightWidth: 0.5 }}
              flex={1}
            >{`날짜`}</Center>
            <Center style={{ borderBottomWidth: 0.5 }} flex={3}>
              {pictureDiary.time}
            </Center>
          </Pressable>
          <Pressable
            flexDirection="row"
            flex={2}
            onPress={() => {
              isEdit && handleOnPressWeather && handleOnPressWeather();
            }}
          >
            <Center
              style={{ borderBottomWidth: 0.5, borderRightWidth: 0.5 }}
              flex={1}
              py={"1"}
            >{`날씨`}</Center>
            <Center style={{ borderBottomWidth: 0.5 }} flex={1} py={"1"}>
              {pictureDiary.weather}
            </Center>
          </Pressable>
        </HStack>

        {/* 제목 */}
        <HStack>
          <Pressable
            flexDirection="row"
            flex={2}
            onPress={() => {
              isEdit &&
                handleOnChangeInputTitle &&
                handleOnChangeInputTitle(pictureDiary.title);
            }}
          >
            <Center
              style={{ borderBottomWidth: 0.5, borderRightWidth: 0.5 }}
              flex={1}
              py={"1"}
            >{`제목`}</Center>
            <Center style={{ borderBottomWidth: 0.5 }} flex={5} py={"1"}>
              <Input isDisabled={!isEdit} defaultValue={pictureDiary.title} />
            </Center>
          </Pressable>
        </HStack>

        {/* 이미지 */}
        <Pressable
          onPress={() => {
            isEdit && handleOnPressImage && handleOnPressImage();
          }}
        >
          <Center background="amber.100">
            <Image
              source={{
                uri: "https://wallpaperaccess.com/full/317501.jpg",
              }}
              alt="Alternate Text"
              style={{ width: 335, height: 114 }}
            />
          </Center>
        </Pressable>

        {/* 원고지 */}
        <Pressable
          onPress={() => {
            isEdit && handleOnPressMenuScript && handleOnPressMenuScript();
          }}
        >
          <MenuScriptBlock scriptsString={pictureDiary.content} />
        </Pressable>
      </VStack>
    </>
  );
};

export default PictureDiaryDetail;
