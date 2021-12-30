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

const PreviewScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"Preview">) => {
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
        <PictureDiaryDetail pictureDiary={route.params.pictureDiary} />
      </Center>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={() => {
              navigation.navigate("CreateAndEdit", {
                pictureDiary: route.params.pictureDiary,
              });
              onClose();
            }}
          >
            편집
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => {}}>삭제</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default PreviewScreen;
