import CustomAnimationView from "@components/atoms/CustomAnimationView";
import { BlockUserState, UserState } from "@state";
import { Box, Divider, FlatList, HStack } from "native-base";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { RootStackScreenProps } from "types/navigation";
import { BlockUser } from "types/user";
import BlockUserGroupHeaderBlock from "./BlockUserGroupHeaderBlock";
import BlockUserItem from "./BlockUserItem";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";

const BlockUserGroupScreen = ({
  navigation,
}: RootStackScreenProps<"BlockUserGroup">) => {
  const user = useRecoilValue(UserState);
  const [blockUser, setBlockUser] = useRecoilState(BlockUserState);

  useEffect(() => {
    if (user) {
      firestore()
        .collection("users")
        .doc(user.uid)
        .collection("blockUserGroup")
        .get()
        .then((snapshot) => {
          const data = snapshot.docs.map((docs) =>
            docs.data()
          ) as Array<BlockUser>;

          setBlockUser(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleOnPressBackIconButton = () => {
    navigation.goBack();
  };

  const handleOnPressUnBlockButton = (uid: string) => {
    console.log(uid);
    //여기서 uid로 차단해제 해주면 됨, 차단해제가 되었으면, 리스트에서 삭제
    if (user) {
      firestore()
        .collection("users")
        .doc(user.uid)
        .collection("blockUserGroup")
        .doc(uid)
        .delete()
        .then(() => {
          const newBlockUser = blockUser?.filter((item) =>
            item.uid === uid ? false : true
          );

          setBlockUser(newBlockUser ?? null);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  function renderItem({ item }: any) {
    return (
      <BlockUserItem
        item={item as BlockUser}
        handleOnPressUnBlockButton={handleOnPressUnBlockButton}
      />
    );
  }

  return (
    <CustomAnimationView>
      <BlockUserGroupHeaderBlock
        handleOnPressBackIconButton={handleOnPressBackIconButton}
      />
      {blockUser && <FlatList data={blockUser} renderItem={renderItem} />}
    </CustomAnimationView>
  );
};

export default BlockUserGroupScreen;
