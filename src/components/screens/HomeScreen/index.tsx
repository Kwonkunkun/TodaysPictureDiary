import HomeHeaderBlock from "@components/screens/HomeScreen/HomeHeaderBlock";
import { FlatList, View, Center } from "native-base";
import React, { useState } from "react";
import { RootTabScreenProps } from "types/navigation";
import PictureDiaryListItem from "./PictureDiaryListItem";
import { Dimension, Spaces } from "@constants";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { OrderedPictureDiaryState } from "@state";
import StyledText from "@components/atoms/StyledText";
import CustomButton from "@components/atoms/CustomButton";
import FilterBlock from "./FilterBlock";
import { formatData } from "@Utils";
import CustomAnimationView from "@components/atoms/CustomAnimationView";

const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
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

  return (
    <CustomAnimationView>
      <HomeHeaderBlock
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        handleOnPressPlusIconButton={handleOnPressPlusIconButton}
      />

      {/* 필터링 chip */}
      <FilterBlock />

      {/* 아이템 list */}
      {orderedPictureDiaries && orderedPictureDiaries.length !== 0 ? (
        <FlatList
          data={formatData(orderedPictureDiaries, Dimension.isPad ? 4 : 2)}
          renderItem={({ item }) =>
            item.empty ? (
              <View
                flex={1}
                width={Dimension.window.width / (Dimension.isPad ? 4 : 2)}
                p={"2"}
              />
            ) : (
              <PictureDiaryListItem
                pictureDiary={item as PictureDiary}
                handleOnPressItem={() => {
                  navigation.navigate("Preview", { pictureDiary: item });
                }}
              />
            )
          }
          numColumns={Dimension.isPad ? 4 : 2}
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
    </CustomAnimationView>
  );
};

export default HomeScreen;
