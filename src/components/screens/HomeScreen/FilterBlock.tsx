import Chip from "@components/atoms/Chip";
import { Colors } from "@constants";
import { OrderedPictureDiaryState, SeletedOrderOptionState } from "@state";
import { HStack } from "native-base";
import React, { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

type FilterBlockProps = {};

const FilterBlock = ({}) => {
  const [option, setOption] = useRecoilState(SeletedOrderOptionState);

  return (
    <HStack space={"xs"} p="1" bg={Colors.header}>
      <Chip
        isSelected={option === "date"}
        innerText="날짜순"
        handleOnPressButton={() => {
          if (option === "date") {
            return;
          }
          setOption("date");
        }}
      />
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
    </HStack>
  );
};

export default FilterBlock;
