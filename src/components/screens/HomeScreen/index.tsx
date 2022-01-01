import { HomeHeaderBlock } from "@components/screens/HomeScreen/HomeHeaderBlock";
import { FlatList, View, Center } from "native-base";
import React, { useEffect, useState } from "react";
import { RootStackScreenProps } from "types/navigation";
import PictureDiaryListItem from "./PictureDiaryListItem";
import { Colors, Dimension, Sizes, Spaces } from "@constants";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { OrderedPictureDiaryState, PictureDiaryState } from "@state";
import StyledText from "@components/atoms/StyledText";
import CustomView from "@components/atoms/CustomView";
import CustomButton from "@components/atoms/CustomButton";
import FilterBlock from "./FilterBlock";

const formatData = (data: Array<any>, numColumns: number) => {
  let result = [...data];
  const numberOfFullRows = Math.floor(result.length / numColumns);

  let numberOfElementsLastRow = result.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    result.push({ empty: true });
    numberOfElementsLastRow++;
  }

  return result;
};

const HomeScreen = ({ navigation }: RootStackScreenProps<"Home">) => {
  const [selectedTime, setSelectedTime] = useState(() => {
    let date = new Date();
    date.setDate(1);
    return date;
  });

  const orderedPictureDiaries = useRecoilValue(OrderedPictureDiaryState);
  const orderedPictureDiariesLoadable = useRecoilValueLoadable(
    OrderedPictureDiaryState
  );

  const handleOnPressPlusIconButton = () => {
    navigation.navigate("CreateAndEdit", { pictureDiary: undefined });
  };

  const handleOnPressSettingIconButton = () => {
    navigation.navigate("Setting");
  };

  const renderPictureDiaryList = () => {
    switch (orderedPictureDiariesLoadable.state) {
      case "hasValue":
        return;
      case "loading":
        return (
          <CustomView>
            <StyledText>loading</StyledText>
          </CustomView>
        );

      case "hasError":
        throw orderedPictureDiariesLoadable.contents;
    }
  };

  return (
    <CustomView>
      <HomeHeaderBlock
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        handleOnPressPlusIconButton={handleOnPressPlusIconButton}
        handleOnPressSettingIconButton={handleOnPressSettingIconButton}
      />

      {/* 필터링 chip */}
      <FilterBlock />

      {/* 아이템 list */}
      {orderedPictureDiaries && orderedPictureDiaries.length !== 0 ? (
        <FlatList
          data={formatData(orderedPictureDiaries, 2)}
          renderItem={({ item }) =>
            item.empty ? (
              <View flex={1} width={Dimension.window.width / 2} p={"2"} />
            ) : (
              <PictureDiaryListItem
                pictureDiary={item as PictureDiary}
                handleOnPressItem={() => {
                  navigation.navigate("Preview", { pictureDiary: item });
                }}
              />
            )
          }
          numColumns={2}
          keyExtractor={(item, idx) => idx.toString()}
        />
      ) : (
        <Center flex={1}>
          <StyledText style={{ padding: Spaces.padding }}>
            아직 그림일기가 생성되지 않았어요.
          </StyledText>
          <CustomButton
            innerText="그림일기 생성하기"
            handleOnPressButton={handleOnPressPlusIconButton}
          ></CustomButton>
        </Center>
      )}
    </CustomView>
  );
};

export default HomeScreen;
