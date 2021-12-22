import React, { useState } from "react";
import { HStack, IconButton, Icon, Text, Box, StatusBar } from "native-base";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { Colors, Spaces } from "@constants";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from "react-native";
import { HeaderBlock } from "@components/blocks/HeaderBlock";
/**
 * HeaderBlock
 * 기능
 * 1. 필터링할 년 월을 정하고 보여주는 역할
 * 2. 추가, 설정으로 가는 버튼
 */

type HomeHeaderBlockProps = {
  selectedTime: Date;
  setSelectedTime: React.Dispatch<React.SetStateAction<Date>>;
  handleOnPressPlusIconButton: () => void;
  handleOnPressSettingIconButton: () => void;
};

export const HomeHeaderBlock = ({
  selectedTime,
  setSelectedTime,
  handleOnPressPlusIconButton,
  handleOnPressSettingIconButton,
}: HomeHeaderBlockProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date);
    setSelectedTime(date);
    hideDatePicker();
  };

  return (
    <>
      <HeaderBlock
        leftComponent={
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={showDatePicker}
          >
            <Text
              style={{ alignSelf: "center", paddingLeft: Spaces.left }}
              color="white"
              fontSize="15"
              fontWeight="medium"
            >
              {`${selectedTime.getFullYear()}년 ${
                selectedTime.getMonth() + 1
              }월`}
            </Text>
            <Icon
              size="sm"
              as={<Entypo name="chevron-small-down" color="black" />}
              color="white"
            />
          </TouchableOpacity>
        }
        rightComponent={
          <>
            <IconButton
              icon={
                <Icon as={<Entypo name="plus" />} size="sm" color="white" />
              }
              onPress={() => {
                handleOnPressPlusIconButton();
              }}
            />

            <IconButton
              icon={
                <Icon
                  as={<MaterialIcons name="settings" />}
                  size="sm"
                  color="white"
                />
              }
              onPress={() => {
                handleOnPressSettingIconButton();
              }}
            />
          </>
        }
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        confirmTextIOS={"확인"}
        cancelTextIOS={"취소"}
        display="spinner"
        locale="ko_KR"
        date={selectedTime}
      />
    </>
  );
};
