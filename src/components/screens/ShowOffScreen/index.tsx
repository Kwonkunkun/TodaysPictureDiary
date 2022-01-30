import CustomAnimationView from "@components/atoms/CustomAnimationView";
import CustomView from "@components/atoms/CustomView";
import React, { useEffect, useState } from "react";
import { RootTabScreenProps } from "types/navigation";

import { utils } from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";
import ShowOffHeaderBlock from "./ShowOffHeaderBlock";
import FilterBlock from "./FilterBlock";
import dummyData from "./dummyData.json";
import { FlatList, View } from "native-base";
import { formatData } from "@Utils";
import { Dimension } from "@constants";
import ShowOffPictureDiaryListItem from "./ShowOffPictureDiaryListItem";
import { NativeScrollEvent, RefreshControl } from "react-native";

/**
 * ShowOffScreen
 * 정렬: 최신순, 잘했어요순
 * pagenation: 16개씩 ㄲ
 * refrresh control 기능 ㄲ
 *
 */

const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 16;
const DEFAULT_ENDITEMCREATEAT = "3000-01-16T08:49:27.474Z";

const ShowOffScreen = ({ navigation }: RootTabScreenProps<"ShowOff">) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresing, setRefreshing] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [page, setPage] = useState({ val: DEFAULT_PAGE });
  const [endItemCreateAt, setEndItemCreateAt] = useState(
    "3000-01-16T08:49:27.474Z"
  );
  const [showOffPictureDiaries, setShowOffPictureDiaries] = useState<
    Array<ShowOffPictureDiary>
  >([]);

  useEffect(() => {
    fetchItem(page.val === 0 ? true : false);
  }, [page]);

  const fetchItem = (isRefresh?: boolean) => {
    console.log("fetchItem1", isLoading, isEnd);
    if (isLoading || isEnd) {
      setIsLoading(false);
      setRefreshing(false);
      return;
    }
    console.log("fetchItem2");

    setIsLoading(true);
    firestore()
      .collection("pictureDiaries")
      .orderBy("createAt", "desc")
      .startAfter(endItemCreateAt)
      .limit(DEFAULT_SIZE)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((docs) =>
          docs.data()
        ) as Array<ShowOffPictureDiary>;
        setEndItemCreateAt(
          data[data.length - 1].createAt ?? DEFAULT_ENDITEMCREATEAT
        );
        console.log(data[data.length - 1].createAt);

        if (isRefresh) {
          setShowOffPictureDiaries(data);
        } else {
          if (showOffPictureDiaries) {
            setShowOffPictureDiaries([...showOffPictureDiaries, ...data]);
          }
        }

        //data끝인거 체크
        if (data.length < DEFAULT_SIZE) {
          setIsEnd(true);
        }
      })
      .catch((error) => {
        console.log("에러당께요", error);
      })
      .finally(() => {
        setIsLoading(false);
        setRefreshing(false);
      });
  };

  const handleOnPressQuestionIconButton = () => {
    //이거 누르면 어케 추가하는지 설명하는 modal? 혹은 page 보여주기
  };

  //이건 detail page에 넘겨주는 함수
  const handleOnPressDeleteButton = (
    showOffPictureDiary: ShowOffPictureDiary
  ) => {
    const newPictureDiaries = showOffPictureDiaries?.filter((item) => {
      if (item.id === showOffPictureDiary.id) {
        return false;
      }
      return true;
    });

    setShowOffPictureDiaries(newPictureDiaries);
  };

  const onRefresh = () => {
    console.log("onRefresh");
    setRefreshing(true);
    setIsLoading(false);
    setIsEnd(false);
    setPage({ val: DEFAULT_PAGE });
    setEndItemCreateAt(DEFAULT_ENDITEMCREATEAT);
  };

  const onScrollEndReach = () => {
    console.log("onScrollEndReach");
    if (isEnd || isLoading) {
      return;
    }

    setPage({ val: page.val + 1 });
  };

  return (
    <CustomAnimationView>
      <ShowOffHeaderBlock
        handleOnPressQuestionIconButton={handleOnPressQuestionIconButton}
      />
      <FilterBlock />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refresing} onRefresh={onRefresh} />
        }
        onEndReached={onScrollEndReach}
        onEndReachedThreshold={1}
        data={formatData(showOffPictureDiaries, 2)}
        renderItem={({ item }) =>
          item.empty ? (
            <View flex={1} width={Dimension.window.width / 2} p={"2"} />
          ) : (
            <ShowOffPictureDiaryListItem
              pictureDiary={item as ShowOffPictureDiary}
              handleOnPressItem={() => {
                //다른페이지 만들면 변경
                navigation.navigate("ShowOffDetail", {
                  pictureDiary: item,
                  handleOnPressDeleteButton: handleOnPressDeleteButton,
                });
              }}
            />
          )
        }
        numColumns={2}
        keyExtractor={(item, idx) => idx.toString()}
      />
    </CustomAnimationView>
  );
};

export default ShowOffScreen;
