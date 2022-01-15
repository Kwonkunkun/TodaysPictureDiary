import Chip from "@components/atoms/Chip";
import { Colors } from "@constants";
import { OrderedPictureDiaryState, SeletedOrderOptionState } from "@state";
import { HStack } from "native-base";
import React, { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

type FilterBlockProps = {};

const FilterBlock = ({}) => {
  const [option, setOption] = useState<"recent" | "like">("recent");

  return (
    <HStack space={"xs"} p="1" bg={Colors.header}>
      <Chip
        isSelected={option === "recent"}
        innerText="최신순"
        handleOnPressButton={() => {
          if (option === "recent") {
            return;
          }
          setOption("recent");
        }}
      />
      <Chip
        isSelected={option === "like"}
        innerText="좋아요순"
        handleOnPressButton={() => {
          if (option === "like") {
            return;
          }
          setOption("like");
        }}
      />
    </HStack>
  );
};

export default FilterBlock;
