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
import DummyData from "./dummyData.json";
import { Dimension } from "@constants";

const formatData = (data: Array<any>, numColumns: number) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const HomeScreen = ({ navigation }: RootStackScreenProps<"Home">) => {
  const [selectedTime, setSelectedTime] = useState(() => {
    let date = new Date();
    date.setDate(1);
    return date;
  });

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

      <FlatList
        data={formatData(DummyData.data, 2)}
        renderItem={({ item }) =>
          item.empty ? (
            <View flex={1} width={Dimension.window.width / 2} p={"2"} />
          ) : (
            <PictureDiaryListItem
              pictureDiary={item as PictureDiary}
              handleOnPressItem={() => {
                navigation.navigate("Preview");
              }}
            />
          )
        }
        numColumns={2}
        keyExtractor={(item, idx) => idx.toString()}
      />
    </>
  );
};

export default HomeScreen;
