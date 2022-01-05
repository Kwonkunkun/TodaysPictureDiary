import { HeaderBlock } from "@components/blocks/HeaderBlock";
import PictureDiaryDetail from "@components/blocks/PictureDiaryDetail";
import { Colors, Dimension, Sizes, Spaces } from "@constants";
import {
  Actionsheet,
  HStack,
  Pressable,
  ScrollView,
  VStack,
} from "native-base";
import React, { useRef, useState } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { RootStackScreenProps } from "types/navigation";
import LottieView from "lottie-react-native";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView as DefaultScrollView,
  TextInput,
} from "react-native";
import { useRecoilState } from "recoil";
import { PictureDiaryState } from "@state";
import CustomView from "@components/atoms/CustomView";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import CreateAndEditDiaryHeaderBlock from "./CreateAndEditDiaryHeaderBlock";

/**
 * CreateAndEditDiaryScreen
 * mode: create & edit
 */

const CreateAndEditDiaryScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"CreateAndEdit">) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isWeatherPickerVisible, setWeatherPickerVisiblilty] = useState(false);
  const contentTextAreaRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<DefaultScrollView>(null);
  const { setItem } = useAsyncStorage("@pictureDiaries");
  const [pictureDiaries, setPictureDiaries] = useRecoilState(PictureDiaryState);
  const [isEdit, setIsEdit] = useState<Boolean>(
    route.params.pictureDiary ? true : false
  );
  const [pictureDiary, setPictureDiary] = useState<PictureDiary>(
    route.params.pictureDiary
      ? route.params.pictureDiary
      : {
          id: new Date().toISOString(),
          time: new Date().toISOString(),
          weather: "sun",
          title: "",
          base64Img: "",
          content: "",
        }
  );
  const [isContentTextAreaVisible, setContentTextAreaVisibility] = useState(
    false
  );

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showWeatherPicker = () => {
    setWeatherPickerVisiblilty(true);
  };

  const hideWeatherPicker = () => {
    setWeatherPickerVisiblilty(false);
  };

  const handleDatePickerConfirm = (date: Date) => {
    setPictureDiary({
      ...pictureDiary,
      time: date.toISOString(),
      // time: `${date.getFullYear()}년 ${
      //   date.getMonth() + 1
      // }월 ${date.getDate()}일`,
    });
    hideDatePicker();
  };

  const handleOnPressCheckIconButton = () => {
    //이 부분을 edit와 create 나눠서 분기처리할것
    if (isEdit) {
      const newPictureDiaries = pictureDiaries!.map((item) => {
        if (item.id === pictureDiary.id) {
          return pictureDiary;
        }
        return item;
      });
      setPictureDiaries(newPictureDiaries);
      setPictureDiaryPhoneStorage(newPictureDiaries);
    } else {
      const newPictureDiaries = pictureDiaries
        ? [...pictureDiaries, pictureDiary]
        : [pictureDiary];
      setPictureDiaries(newPictureDiaries);
      setPictureDiaryPhoneStorage(newPictureDiaries);
    }

    navigation.popToTop();
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

  return (
    <CustomView>
      <CreateAndEditDiaryHeaderBlock
        handleOnPressBackIconButton={() => navigation.goBack()}
        handleOnPressCheckIconButton={handleOnPressCheckIconButton}
      />

      {/* body */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          ref={scrollViewRef}
          m={Spaces.padding}
          style={{ marginBottom: 0 }}
        >
          <PictureDiaryDetail
            pictureDiary={pictureDiary}
            isEdit={true}
            handleOnPressTime={showDatePicker}
            handleOnPressWeather={showWeatherPicker}
            handleOnChangeInputTitle={(text: string) => {
              setPictureDiary({
                ...pictureDiary,
                title: text,
              });
            }}
            handleOnPressImage={() => {
              navigation.navigate("Drawing", {
                base64Img: pictureDiary.base64Img,
                setBase64Img: (base64Img: string) => {
                  setPictureDiary({
                    ...pictureDiary,
                    base64Img: base64Img,
                  });
                },
              });
            }}
            handleOnPressMenuScript={() => {
              contentTextAreaRef.current?.focus();
            }}
          />
          {Platform.OS === "android" && (
            <TextInput
              ref={contentTextAreaRef}
              multiline
              style={{
                borderWidth: 0.3,
                borderTopWidth: 0,
                color: Colors.black,
                fontFamily: "young-child-bold",
                backgroundColor: Colors.snow,
                padding: Spaces.padding,
                letterSpacing: 15,
                fontSize: Sizes.bigText,
              }}
              defaultValue={pictureDiary.content}
              onChangeText={(text) => {
                setPictureDiary({ ...pictureDiary, content: text });
              }}
              onFocus={() => {
                setContentTextAreaVisibility(true);
                setTimeout(() => {
                  scrollViewRef.current?.scrollToEnd();
                }, 500);
              }}
              onBlur={() => {
                setContentTextAreaVisibility(false);
              }}
              maxLength={50}
              placeholder="내용을 작성해주세요."
              numberOfLines={5}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* input */}
      {Platform.OS !== "android" && (
        <TextInput
          ref={contentTextAreaRef}
          style={{
            color: "transparent",
          }}
          defaultValue={pictureDiary.content}
          onChangeText={(text) => {
            setPictureDiary({ ...pictureDiary, content: text });
          }}
          onFocus={() => {
            setTimeout(() => {
              scrollViewRef.current?.scrollToEnd();
            }, 100);
          }}
          onBlur={() => {}}
          maxLength={50}
        />
      )}

      {/* date picker */}
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDatePickerConfirm}
        onCancel={hideDatePicker}
        confirmTextIOS={"확인"}
        cancelTextIOS={"취소"}
        display="spinner"
        locale="ko_KR"
      />

      {/* action sheet */}
      <Actionsheet
        isOpen={isWeatherPickerVisible}
        onClose={hideWeatherPicker}
        size="full"
      >
        <Actionsheet.Content>
          {lottieGroup.map((lotties, idx) => (
            <VStack key={idx}>
              <HStack>
                {lotties.map((lottie) => (
                  <Pressable
                    key={lottie.title}
                    onPress={() => {
                      setPictureDiary({
                        ...pictureDiary,
                        weather: lottie.title as
                          | "sun"
                          | "rain"
                          | "snow"
                          | "cloud",
                      });
                      hideWeatherPicker();
                    }}
                  >
                    <LottieView
                      autoPlay={true}
                      source={lottie.source}
                      style={{
                        width: Dimension.window.width / 2,
                        height: Dimension.window.width / 2,
                        backgroundColor: "transparent",
                      }}
                    />
                  </Pressable>
                ))}
              </HStack>
            </VStack>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </CustomView>
  );
};

export default CreateAndEditDiaryScreen;

const lottieGroup = [
  [
    { title: "sun", source: require("@assets/lotties/sun.json") },
    {
      title: "cloud",
      source: require("@assets/lotties/cloud.json"),
    },
  ],
  [
    { title: "rain", source: require("@assets/lotties/rain.json") },
    { title: "snow", source: require("@assets/lotties/snow.json") },
  ],
];
