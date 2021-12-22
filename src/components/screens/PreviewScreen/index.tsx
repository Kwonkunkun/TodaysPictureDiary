import { HeaderBlock } from "@components/blocks/HeaderBlock";
import PictureDiaryDetail from "@components/blocks/PictureDiaryDetail";
import { Spaces } from "@constants";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import {
  Actionsheet,
  Box,
  Center,
  Icon,
  IconButton,
  Text,
  useDisclose,
} from "native-base";
import React from "react";
import { RootStackScreenProps } from "types/navigation";

const PreviewScreen = ({ navigation }: RootStackScreenProps<"Preview">) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <>
      <HeaderBlock
        leftComponent={
          <IconButton
            icon={
              <Icon
                as={<Entypo name="chevron-left" />}
                size="sm"
                color="white"
              />
            }
            onPress={() => {
              navigation.goBack();
            }}
          />
        }
        rightComponent={
          <IconButton
            icon={
              <Icon
                as={<MaterialIcons name="more-vert" />}
                size="sm"
                color="white"
              />
            }
            onPress={() => {
              onOpen();
            }}
          />
        }
      />
      <Center m={Spaces.padding}>
        <PictureDiaryDetail
          pictureDiary={{
            time: "2021년 04월 01일",
            weather: "sun",
            title: "집에 가고 싶어요",
            base64Img: "",
            content: "집에 가면 좋아요",
          }}
        />
      </Center>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={() => {
              navigation.navigate("Create");
              onClose();
            }}
          >
            편집
          </Actionsheet.Item>
          <Actionsheet.Item>삭제</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default PreviewScreen;
