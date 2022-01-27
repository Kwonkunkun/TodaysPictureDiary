import CustomAnimationView from "@components/atoms/CustomAnimationView";
import CustomButton from "@components/atoms/CustomButton";
import { Colors, Spaces } from "@constants";
import { FormControl, Input, Stack, TextArea } from "native-base";
import React, { useState } from "react";
import { Alert } from "react-native";
import { RootStackScreenProps } from "types/navigation";
import ReportHeaderBlock from "./ReportHeaderBlock";
import firestore from "@react-native-firebase/firestore";

const ReportScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"Report">) => {
  const { contentId, plaintiffUid, defendantUid } = route.params;
  const [reportTitle, setReportTitle] = useState("");
  const [reportDetail, setReportDetail] = useState("");

  const handleOnPressCloseButton = () => {
    navigation.goBack();
  };

  const handleOnPressReportButton = () => {
    //필드를 다 채우지 않았을시에 return
    if (reportTitle === "") {
      Alert.alert("신고사유를 적어주세요");
      return;
    }

    if (reportDetail === "") {
      Alert.alert("자세한 내용을 적어주세요");
      return;
    }

    firestore()
      .collection("reports")
      .add({
        contentId,
        plaintiffUid,
        defendantUid,
        reportTitle,
        reportDetail,
      })
      .then(() => {
        Alert.alert("신고가 완료되었습니다.", undefined, [
          {
            text: "확인",
            style: "cancel",
            onPress: () => {
              handleOnPressCloseButton();
            },
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("서버 에러입니다. 다시 시도해주세요.");
      });
  };

  return (
    <CustomAnimationView style={{ backgroundColor: Colors.snow }}>
      <ReportHeaderBlock handleOnPressCloseButton={handleOnPressCloseButton} />
      <Stack flex={1} space={"sm"} p={Spaces.padding}>
        <Input
          autoFocus
          placeholder={"신고사유를 적어주세요"}
          onChangeText={setReportTitle}
        />
        <TextArea
          h={"24"}
          placeholder="자세한 내용을 적어주세요."
          w="100%"
          onChangeText={setReportDetail}
        />

        <CustomButton
          innerText="신고하기"
          handleOnPressButton={handleOnPressReportButton}
          style={{
            width: "100%",
          }}
        />
      </Stack>
    </CustomAnimationView>
  );
};

export default ReportScreen;
