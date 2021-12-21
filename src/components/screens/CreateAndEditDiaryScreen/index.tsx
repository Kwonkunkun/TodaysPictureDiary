import { HeaderBlock } from "@components/blocks/HeaderBlock";
import PictureDiaryDetail from "@components/blocks/PictureDiaryDetail";
import { Dimension, Spaces } from "@constants";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import {
  Actionsheet,
  HStack,
  Icon,
  IconButton,
  Pressable,
  ScrollView,
  VStack,
} from "native-base";
import React, { useRef, useState } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { RootStackScreenProps } from "types/navigation";
import LottieView from "lottie-react-native";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import { ITextAreaProps } from "native-base/lib/typescript/components/primitives/TextArea";

const lottieGroup = [
  [
    { title: "sun", source: require("../../../../assets/lotties/sun.json") },
    {
      title: "cloud",
      source: require("../../../../assets/lotties/cloud.json"),
    },
  ],
  [
    { title: "rain", source: require("../../../../assets/lotties/rain.json") },
    { title: "snow", source: require("../../../../assets/lotties/snow.json") },
  ],
];

const CreateAndEditDiaryScreen = ({
  navigation,
}: RootStackScreenProps<"Create">) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isWeatherPickerVisible, setWeatherPickerVisiblilty] = useState(false);
  const [
    isPictureDiaryDetailVisible,
    setPictureDiaryDetailVisiblity,
  ] = useState(false);
  let contentTextAreaRef: TextInput | null;

  const [pictureDiary, setPictureDiary] = useState<PictureDiary>({
    time: "2021년 4월 1일",
    weather: "sun",
    title: "집에 가고 싶어요",
    base64Img: "",
    content: "집에 가면 좋아요",
  });

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

  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date);
    setPictureDiary({
      ...pictureDiary,
      time: `${date.getFullYear()}년 ${
        date.getMonth() + 1
      }월 ${date.getDate()}일`,
    });
    hideDatePicker();
  };
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
                as={<MaterialIcons name="check" />}
                size="sm"
                color="white"
              />
            }
          />
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView m={Spaces.padding} style={{ marginBottom: 0 }}>
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
              navigation.navigate("Drawing");
            }}
            handleOnPressMenuScript={() => {
              contentTextAreaRef?.focus();
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <TextInput
        ref={(ref) => {
          contentTextAreaRef = ref;
        }}
        style={{ color: "white" }}
        defaultValue={pictureDiary.content}
        onChangeText={(text) => {
          setPictureDiary({ ...pictureDiary, content: text });
        }}
        onFocus={() => {}}
        onBlur={() => {
          setPictureDiaryDetailVisiblity(true);
        }}
      />

      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        confirmTextIOS={"확인"}
        cancelTextIOS={"취소"}
        display="spinner"
        locale="ko_KR"
      />

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
                        backgroundColor: "white",
                      }}
                    />
                  </Pressable>
                ))}
              </HStack>
            </VStack>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default CreateAndEditDiaryScreen;
