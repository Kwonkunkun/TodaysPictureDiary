import CustomView from "@components/atoms/CustomView";
import StyledText from "@components/atoms/StyledText";
import { HeaderBlock } from "@components/blocks/HeaderBlock";
import PictureDiaryDetail from "@components/blocks/PictureDiaryDetail";
import { Colors, Spaces } from "@constants";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { PictureDiaryState } from "@state";
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
import { useRecoilState } from "recoil";
import { RootStackScreenProps } from "types/navigation";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const PreviewScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"Preview">) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [pictureDiaries, setPictureDiaries] = useRecoilState(PictureDiaryState);
  const { setItem } = useAsyncStorage("@pictureDiaries");

  const onPressDeleteButton = () => {
    const newPictureDiaries = pictureDiaries?.filter((item) => {
      if (item.id === route.params.pictureDiary.id) {
        return false;
      }
      return true;
    });

    setPictureDiaries(newPictureDiaries);
    setItem(JSON.stringify(newPictureDiaries))
      .then(() => {
        console.log("저장 성공");
      })
      .catch((err) => {
        console.log("저장 실패");
        console.log(err);
      });
    navigation.goBack();
  };

  return (
    <CustomView>
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
            <StyledText>편집</StyledText>
          </Actionsheet.Item>
          <Actionsheet.Item onPress={onPressDeleteButton}>
            <StyledText>삭제</StyledText>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </CustomView>
  );
};

export default PreviewScreen;
