import { HomeHeaderBlock } from "@components/screens/HomeScreen/HomeHeaderBlock";
import {
  HStack,
  VStack,
  SimpleGrid,
  ScrollView,
  FlatList,
  View,
} from "native-base";
import React, { useState } from "react";
import { RootStackScreenProps } from "types/navigation";
import PictureDiaryListItem from "./PictureDiaryListItem";
import { Dimension } from "@constants";
import { useRecoilValue } from "recoil";
import { PictureDiaryState } from "@state";

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

  const pictureDiaries = useRecoilValue(PictureDiaryState);

  return (
    <>
      <HomeHeaderBlock
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        handleOnPressPlusIconButton={() => {
          navigation.navigate("CreateAndEdit", { pictureDiary: undefined });
        }}
        handleOnPressSettingIconButton={() => {
          navigation.navigate("Setting");
        }}
      />

      {pictureDiaries ? (
        <FlatList
          data={formatData(pictureDiaries, 2)}
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
        <></>
      )}
    </>
  );
};

export default HomeScreen;
