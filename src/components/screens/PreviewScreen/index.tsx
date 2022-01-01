import CustomView from "@components/atoms/CustomView";
import StyledText from "@components/atoms/StyledText";
import { HeaderBlock } from "@components/blocks/HeaderBlock";
import PictureDiaryDetail from "@components/blocks/PictureDiaryDetail";
import { Colors, Spaces } from "@constants";
import { Entypo, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { PictureDiaryState } from "@state";
import {
  Actionsheet,
  Box,
  Center,
  Icon,
  IconButton,
  Spinner,
  Text,
  useDisclose,
} from "native-base";
import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import { RootStackScreenProps } from "types/navigation";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import PreviewHeaderBlock from "./PreviewHeaderBlock";

const PreviewScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"Preview">) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [pictureDiaries, setPictureDiaries] = useRecoilState(PictureDiaryState);
  const { setItem } = useAsyncStorage("@pictureDiaries");
  const [status, requestPermission] = MediaLibrary.usePermissions();
  let viewShotRef = useRef<ViewShot>(null);

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

  const handleOnPressDownloadIconButton = async (clearState: () => void) => {
    //permission check, ref check
    if (!status?.granted || !viewShotRef.current?.capture) {
      requestPermission();
      clearState();
      return;
    }

    const uri = await viewShotRef.current.capture();
    await MediaLibrary.saveToLibraryAsync(uri);
    clearState();
  };

  return (
    <CustomView>
      <PreviewHeaderBlock
        handleOnPressBackIconButton={() => {
          navigation.goBack();
        }}
        handleOnPressMoreIconButton={onOpen}
        handleOnPressDownloadIconButton={handleOnPressDownloadIconButton}
      />
      <Center m={Spaces.padding}>
        <ViewShot ref={viewShotRef} options={{ format: "png", quality: 0.9 }}>
          <PictureDiaryDetail pictureDiary={route.params.pictureDiary} />
        </ViewShot>
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
