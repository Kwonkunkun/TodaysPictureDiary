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
import ShowOffDetailHeaderBlock from "./ShowOffDetailHeaderBlock";

const ShowOffDetailScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"ShowOffDetail">) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [pictureDiary, setPictureDiary] = useState(route.params.pictureDiary);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const user = useRecoilValue(UserState);
  let viewShotRef = useRef<ViewShot>(null);

  const onPressReportButton = () => {
    if (user) {
      navigation.navigate("Report", {
        contentId: pictureDiary.id,
        plaintiffUid: pictureDiary.uid,
        defendantUid: user.uid,
      });
    } else {
      navigation.navigate("SignIn");
    }
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
      <ShowOffDetailHeaderBlock
        creatorName={pictureDiary.creatorName}
        handleOnPressBackIconButton={() => {
          navigation.goBack();
        }}
        handleOnPressDownloadIconButton={handleOnPressDownloadIconButton}
        handleOnPressMoreIconButton={onOpen}
      />
      <Center p={Spaces.padding}>
        <ViewShot ref={viewShotRef} options={{ format: "png", quality: 0.9 }}>
          <PictureDiaryDetail pictureDiary={pictureDiary} />
        </ViewShot>
      </Center>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={onPressReportButton}>
            <StyledText>{`신고하기 (${
              user ? "현재 로그인중" : "현재 로그인이 아님"
            })`}</StyledText>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </CustomView>
  );
};

export default ShowOffDetailScreen;
