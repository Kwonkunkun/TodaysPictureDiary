import React, { useState } from "react";
import {
  Center,
  Container,
  Divider,
  HStack,
  // Image,
  Input,
  Pressable,
  TextArea,
  VStack,
} from "native-base";
import MenuScriptBlock from "@components/blocks/MenuScriptBlock";
import { Image } from "react-native";
import { Colors } from "@constants";
import { getAppDateStringFormatWith } from "@Utils";

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
      <VStack borderWidth={0.3} backgroundColor={Colors.snow}>
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
              {getAppDateStringFormatWith(pictureDiary.time)}
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
              <Input
                w="80%"
                isDisabled={!isEdit}
                defaultValue={pictureDiary.title}
              />
            </Center>
          </Pressable>
        </HStack>

        {/* 이미지 */}
        <Pressable
          onPress={() => {
            isEdit && handleOnPressImage && handleOnPressImage();
          }}
        >
          <Center background="white" borderBottomWidth="1">
            <Image
              source={{
                uri:
                  pictureDiary.base64Img !== "" ? pictureDiary.base64Img : "",
              }}
              style={{ width: "100%", height: 240 }}
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
