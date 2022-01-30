import CustomAnimationView from "@components/atoms/CustomAnimationView";
import { Box, Divider, FlatList, HStack } from "native-base";
import React from "react";
import { RootStackScreenProps } from "types/navigation";
import { BlockUser } from "types/user";
import BlockUserGroupHeaderBlock from "./BlockUserGroupHeaderBlock";
import BlockUserItem from "./BlockUserItem";

const data: Array<BlockUser> = [
  {
    uid: "ksdajflsad",
    username: "username",
  },
  {
    uid: "ksdajflsad",
    username: "username",
  },
];

const BlockUserGroupScreen = ({
  navigation,
}: RootStackScreenProps<"BlockUserGroup">) => {
  const handleOnPressBackIconButton = () => {
    navigation.goBack();
  };

  const handleOnPressUnBlockButton = (uid: string) => {
    console.log(uid);
    //여기서 uid로 차단해제 해주면 됨, 차단해제가 되었으면, 리스트에서 삭제
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
      <FlatList data={data} renderItem={renderItem} />
    </CustomAnimationView>
  );
};

export default BlockUserGroupScreen;
