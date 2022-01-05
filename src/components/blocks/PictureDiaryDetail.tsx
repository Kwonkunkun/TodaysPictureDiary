import React, { memo } from "react";
import { Center, Divider, HStack, Input, Pressable, VStack } from "native-base";
import MenuScriptBlock from "@components/blocks/MenuScriptBlock";
import { Image, Platform } from "react-native";
import { Colors, Spaces } from "@constants";
import { getAppDateStringFormatWith, getClientStringWith } from "@Utils";
import StyledText from "@components/atoms/StyledText";
import emptyPicture from "@assets/images/emptyPicture.png";

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
            >
              <StyledText>날짜</StyledText>
            </Center>
            <Center style={{ borderBottomWidth: 0.5 }} flex={3}>
              <StyledText>
                {getAppDateStringFormatWith(pictureDiary.time)}
              </StyledText>
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
            >
              <StyledText>날씨</StyledText>
            </Center>
            <Center style={{ borderBottomWidth: 0.5 }} flex={1} py={"1"}>
              <StyledText>
                {getClientStringWith(pictureDiary.weather)}
              </StyledText>
            </Center>
          </Pressable>
        </HStack>

        {/* 제목 */}
        <HStack>
          <Pressable flexDirection="row" flex={2}>
            <Center
              style={{ borderBottomWidth: 0.5, borderRightWidth: 0.5 }}
              flex={1}
              py={"1"}
            >
              <StyledText>제목</StyledText>
            </Center>
            <Center style={{ borderBottomWidth: 0.5 }} flex={5} py={"1"}>
              <Input
                fontFamily={"young-child-bold"}
                w="80%"
                isDisabled={!isEdit}
                defaultValue={pictureDiary.title}
                onChangeText={(text: string) => {
                  isEdit &&
                    handleOnChangeInputTitle &&
                    handleOnChangeInputTitle(text);
                }}
                placeholder={isEdit ? "15글자 이하로 입력해주세요!" : ""}
                maxLength={15}
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
              source={
                pictureDiary.base64Img !== ""
                  ? {
                      uri: pictureDiary.base64Img,
                    }
                  : emptyPicture
              }
              style={{
                width: "100%",
                height: 260,
                resizeMode: "stretch",
              }}
            />
          </Center>
        </Pressable>

        {/* 원고지 */}
        {(Platform.OS !== "android" || !isEdit) && (
          <Pressable
            onPress={() => {
              isEdit && handleOnPressMenuScript && handleOnPressMenuScript();
            }}
          >
            <MenuScriptBlock scriptsString={pictureDiary.content} />
          </Pressable>
        )}
      </VStack>
    </>
  );
};

export default memo(PictureDiaryDetail);
