import CustomView from "@components/atoms/CustomView";
import StyledText from "@components/atoms/StyledText";
import PictureDiaryDetail from "@components/blocks/PictureDiaryDetail";
import { Colors, Spaces } from "@constants";
import { PictureDiaryState, UserState } from "@state";
import { Actionsheet, Center, useDisclose } from "native-base";
import React, { useRef } from "react";
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
  const [status, requestPermission] = MediaLibrary.usePermissions();
  let viewShotRef = useRef<ViewShot>(null);

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
        creatorName={route.params.pictureDiary.creatorName}
        handleOnPressBackIconButton={() => {
          navigation.goBack();
        }}
        handleOnPressDownloadIconButton={handleOnPressDownloadIconButton}
      />
      <Center p={Spaces.padding}>
        <ViewShot ref={viewShotRef} options={{ format: "png", quality: 0.9 }}>
          <PictureDiaryDetail pictureDiary={route.params.pictureDiary} />
        </ViewShot>
      </Center>
    </CustomView>
  );
};

export default ShowOffDetailScreen;
