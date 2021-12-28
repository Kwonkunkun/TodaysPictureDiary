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
import React, { useEffect, useRef, useState } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { RootStackScreenProps } from "types/navigation";
import LottieView from "lottie-react-native";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView as DefaultScrollView,
  TextInput,
} from "react-native";

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

  const [pictureDiary, setPictureDiary] = useState<PictureDiary>(
    route.params.pictureDiary
      ? route.params.pictureDiary
      : {
          time: new Date().toISOString(),
          weather: "sun",
          title: "",
          base64Img: "",
          content: "",
        }
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

  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date);
    setPictureDiary({
      ...pictureDiary,
      time: date.toISOString(),
      // time: `${date.getFullYear()}년 ${
      //   date.getMonth() + 1
      // }월 ${date.getDate()}일`,
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
            onPress={() => {
              // ㄴㄴㄴ 그냥 goback
              navigation.goBack();
            }}
          />
        }
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
        </ScrollView>
      </KeyboardAvoidingView>

      {/* input */}
      <TextInput
        ref={contentTextAreaRef}
        style={{ color: "transparent" }}
        defaultValue={pictureDiary.content}
        onChangeText={(text) => {
          setPictureDiary({ ...pictureDiary, content: text });
        }}
        onFocus={(event) => {
          scrollViewRef.current?.scrollTo(event.target);
        }}
        onBlur={() => {}}
      />
      {/* date picker */}
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
    </>
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
