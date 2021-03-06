import React, { memo, useState } from "react";
import { HStack, IconButton, Icon, Image } from "native-base";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { Colors, Sizes, Spaces } from "@constants";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { HeaderBlock } from "@components/blocks/HeaderBlock";
import StyledText from "@components/atoms/StyledText";
import logoImg from "@assets/images/logo.png";

/**
 * HeaderBlock
 * 기능
 * 1. 필터링할 년 월을 정하고 보여주는 역할
 * 2. 추가로 가는 버튼
 */

type HomeHeaderBlockProps = {
  selectedTime: Date;
  setSelectedTime: React.Dispatch<React.SetStateAction<Date>>;
  handleOnPressPlusIconButton: () => void;
};

const HomeHeaderBlock = ({
  selectedTime,
  setSelectedTime,
  handleOnPressPlusIconButton,
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
          <HStack alignItems={"center"}>
            <Image
              source={logoImg}
              width={"1/4"}
              height={"10"}
              resizeMode="contain"
              fallbackSource={logoImg}
            />
            <StyledText
              style={{
                paddingLeft: Spaces.left,
                fontSize: Sizes.bigText,
              }}
            >
              오늘의
            </StyledText>
            <StyledText style={{ color: "green", fontSize: Sizes.bigText }}>
              {` ${"그림일기"}`}
            </StyledText>
          </HStack>
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

export default memo(HomeHeaderBlock);
