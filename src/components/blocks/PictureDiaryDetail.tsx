import React from "react";
import { Center, Container, Divider, HStack, Image, VStack } from "native-base";
import MenuScriptBlock from "@components/blocks/MenuScriptBlock";

type PictureDiaryDetailProps = {
  pictureDiary: PictureDiary;
};

const PictureDiaryDetail = ({ pictureDiary }: PictureDiaryDetailProps) => {
  return (
    <VStack>
      {/* 날짜, 날씨 */}
      <HStack divider={<Divider />}>
        <Center style={{ borderBottomWidth: 0.5 }} flex={1}>{`날짜`}</Center>
        <Center style={{ borderBottomWidth: 0.5 }} flex={3}>
          {pictureDiary.time}
        </Center>
        <Center style={{ borderBottomWidth: 0.5 }} flex={1}>{`날씨`}</Center>
        <Center style={{ borderBottomWidth: 0.5 }} flex={1}>
          {pictureDiary.weather}
        </Center>
      </HStack>

      {/* 제목 */}
      <HStack divider={<Divider width={0.5} />}>
        <Center style={{ borderBottomWidth: 0.5 }} flex={1}>{`제목`}</Center>
        <Center style={{ borderBottomWidth: 0.5 }} flex={5}>
          {pictureDiary.title}
        </Center>
      </HStack>

      {/* 이미지 */}
      <Container>
        <Image
          source={{
            uri: "https://wallpaperaccess.com/full/317501.jpg",
          }}
          alt="Alternate Text"
          size="10"
        />
      </Container>

      {/* 원고지 */}
      <MenuScriptBlock scriptsString={pictureDiary.content} />
    </VStack>
  );
};

export default PictureDiaryDetail;
