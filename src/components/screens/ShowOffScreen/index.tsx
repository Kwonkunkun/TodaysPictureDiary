import CustomAnimationView from "@components/atoms/CustomAnimationView";
import CustomView from "@components/atoms/CustomView";
import React, { useEffect } from "react";
import { RootTabScreenProps } from "types/navigation";

import { utils } from "@react-native-firebase/app";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import ShowOffHeaderBlock from "./ShowOffHeaderBlock";
import FilterBlock from "./FilterBlock";
import dummyData from "./dummyData.json";
import { FlatList, View } from "native-base";
import { formatData } from "@Utils";
import { Dimension } from "@constants";
import PictureDiaryListItem from "../HomeScreen/PictureDiaryListItem";

/**
 * ShowOffScreen
 * 정렬: 최신순, 잘했어요순
 * pagenation: 16개씩 ㄲ
 * refrresh control 기능 ㄲ
 *
 */

const ShowOffScreen = ({ navigation }: RootTabScreenProps<"ShowOff">) => {
  useEffect(() => {
    // firestore().collection("pictureDiaries").add({
    //   title: "테스트",
    //   time: firestore.FieldValue.serverTimestamp(),
    // });
    // firestore()
    //   .collection("pictureDiaries")
    //   .get()
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  const handleOnPressQuestionIconButton = () => {
    //이거 누르면 어케 추가하는지 설명하는 modal? 혹은 page 보여주기
  };

  return (
    <CustomAnimationView>
      <ShowOffHeaderBlock
        handleOnPressQuestionIconButton={handleOnPressQuestionIconButton}
      />
      <FilterBlock />
      {
        <FlatList
          data={formatData(dummyData.data, 2)}
          renderItem={({ item }) =>
            item.empty ? (
              <View flex={1} width={Dimension.window.width / 2} p={"2"} />
            ) : (
              <PictureDiaryListItem
                pictureDiary={item as PictureDiary}
                handleOnPressItem={() => {
                  //슈벌.. 이거 내껀지 아닌지에 대한 체크도 해야함.. ㅠㅠ
                  navigation.navigate("Preview", { pictureDiary: item });
                }}
              />
            )
          }
          numColumns={2}
          keyExtractor={(item, idx) => idx.toString()}
        />
      }
    </CustomAnimationView>
  );
};

export default ShowOffScreen;
