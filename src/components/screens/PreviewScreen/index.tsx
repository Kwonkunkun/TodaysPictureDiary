import CustomView from "@components/atoms/CustomView";
import StyledText from "@components/atoms/StyledText";
import PictureDiaryDetail from "@components/blocks/PictureDiaryDetail";
import { Colors, Spaces } from "@constants";
import { PictureDiaryState, UserState } from "@state";
import { Actionsheet, Center, useDisclose } from "native-base";
import React, { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { RootStackScreenProps } from "types/navigation";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import PreviewHeaderBlock from "./PreviewHeaderBlock";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import { getShowOffPictureDiaryWith } from "@Utils";
import { serverTimestamp } from "firebase/database";

const PreviewScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"Preview">) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [pictureDiary, setPictureDiary] = useState(route.params.pictureDiary);
  const [pictureDiaries, setPictureDiaries] = useRecoilState(PictureDiaryState);
  const { setItem } = useAsyncStorage("@pictureDiaries");
  const [status, requestPermission] = MediaLibrary.usePermissions();
  let viewShotRef = useRef<ViewShot>(null);

  const user = useRecoilValue(UserState);

  const onPressDeleteButton = () => {
    const newPictureDiaries = pictureDiaries?.filter((item) => {
      if (item.id === pictureDiary.id) {
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

  const onPressEditButton = () => {
    navigation.navigate("CreateAndEdit", {
      pictureDiary: pictureDiary,
    });

    onClose();
  };

  const onPressShowOffButton = () => {
    //로그인 상태 확인
    if (user) {
      const addItem = getShowOffPictureDiaryWith(
        pictureDiary,
        user.uid,
        0,
        user.displayName,
        new Date().toISOString()
      );

      firestore()
        .collection("pictureDiaries")
        .doc(addItem.id)
        .set(addItem)
        .then((response) => {
          //내 핸드폰에 저장된곳에도 이거 올린거라고 알려줘야함
          setCheckShowOff();
          Alert.alert(
            `${
              pictureDiary.isShowOff
                ? "변경사항이 업데이트 되었습니다."
                : "자랑 게시판에 등록되었습니다."
            }`,
            ``,
            [
              {
                text: "확인",
                style: "cancel",
                onPress: () => {
                  onClose();
                },
              },
            ]
          );
        })
        .catch();
    } else {
      navigation.navigate("SignIn");
    }
  };

  const setCheckShowOff = () => {
    const newPictureDiaries = pictureDiaries!.map((item) => {
      if (item.id === pictureDiary.id) {
        return { ...item, isShowOff: true };
      }
      return item;
    });
    setPictureDiary({ ...pictureDiary, isShowOff: true });
    setPictureDiaries(newPictureDiaries);
    setPictureDiaryPhoneStorage(newPictureDiaries);
  };

  const setPictureDiaryPhoneStorage = (_pictureDiary: Array<PictureDiary>) => {
    setItem(JSON.stringify(_pictureDiary))
      .then(() => {
        console.log("저장 성공");
      })
      .catch((err) => {
        console.log("저장 실패");
        console.log(err);
      });
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
      <Center p={Spaces.padding}>
        <ViewShot ref={viewShotRef} options={{ format: "png", quality: 0.9 }}>
          <PictureDiaryDetail pictureDiary={pictureDiary} />
        </ViewShot>
      </Center>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={onPressShowOffButton}>
            <StyledText>{`${"자랑하기 업데이트"} (${
              user ? "현재 로그인중" : "현재 로그인이 아님"
            })`}</StyledText>
          </Actionsheet.Item>
          <Actionsheet.Item onPress={onPressEditButton}>
            <StyledText>편집</StyledText>
          </Actionsheet.Item>
          <Actionsheet.Item onPress={onPressDeleteButton}>
            <StyledText style={{ color: "red" }}>삭제</StyledText>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </CustomView>
  );
};

export default PreviewScreen;
