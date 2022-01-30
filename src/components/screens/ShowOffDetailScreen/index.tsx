import CustomView from "@components/atoms/CustomView";
import StyledText from "@components/atoms/StyledText";
import PictureDiaryDetail from "@components/blocks/PictureDiaryDetail";
import { Colors, Spaces } from "@constants";
import { BlockUserState, PictureDiaryState, UserState } from "@state";
import { Actionsheet, Center, useDisclose } from "native-base";
import React, { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { RootStackScreenProps } from "types/navigation";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import ShowOffDetailHeaderBlock from "./ShowOffDetailHeaderBlock";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";

const ShowOffDetailScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"ShowOffDetail">) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [pictureDiary, setPictureDiary] = useState(route.params.pictureDiary);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const user = useRecoilValue(UserState);
  const [blockUser, setBlockUser] = useRecoilState(BlockUserState);
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

  const onPressBlockUserButton = () => {
    if (user) {
      firestore()
        .collection("users")
        .doc(user.uid)
        .collection("blockUserGroup")
        .doc(pictureDiary.uid)
        .set({
          uid: pictureDiary.uid,
          username: pictureDiary.creatorName,
        })
        .then(() => {
          Alert.alert("차단에 성공했습니다.", "", [
            {
              onPress: () => {
                if (blockUser) {
                  setBlockUser([
                    ...blockUser,
                    {
                      uid: pictureDiary.uid,
                      username: pictureDiary.creatorName,
                    },
                  ]);
                }
                navigation.goBack();
              },
            },
          ]);
        })
        .catch((error) => {
          Alert.alert(
            "서버에러로 차단에 실패했습니다. 잠시후 다시 시도해주세요."
          );
        });
    } else {
      navigation.navigate("SignIn");
    }
  };

  const onPressDeleteButton = () => {
    if (user) {
      firestore()
        .collection("pictureDiaries")
        .doc(pictureDiary.id)
        .delete()
        .then(() => {
          route.params.handleOnPressDeleteButton(pictureDiary);
          navigation.goBack();
        })
        .catch((error) => {
          Alert.alert(
            "서버에러로 삭제에 실패했습니다. 잠시후 다시 시도해주세요."
          );
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
      {/* 내것일때와 아닐때 분기를 나눠서 action sheet 보여줌 */}
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        {user?.uid !== pictureDiary.uid ? (
          <Actionsheet.Content>
            <Actionsheet.Item onPress={onPressBlockUserButton}>
              <StyledText style={{ color: "red" }}>{`해당 유저 차단하기 (${
                user ? "현재 로그인중" : "현재 로그인이 아님"
              })`}</StyledText>
            </Actionsheet.Item>

            <Actionsheet.Item onPress={onPressReportButton}>
              <StyledText style={{ color: "red" }}>{`해당 컨텐츠 신고하기 (${
                user ? "현재 로그인중" : "현재 로그인이 아님"
              })`}</StyledText>
            </Actionsheet.Item>
          </Actionsheet.Content>
        ) : (
          <Actionsheet.Content>
            <Actionsheet.Item onPress={onPressDeleteButton}>
              <StyledText style={{ color: "red" }}>{`삭제하기`}</StyledText>
            </Actionsheet.Item>
          </Actionsheet.Content>
        )}
      </Actionsheet>
    </CustomView>
  );
};

export default ShowOffDetailScreen;
