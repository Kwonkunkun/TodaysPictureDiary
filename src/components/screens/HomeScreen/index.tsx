import MenuScriptBlock from "@components/blocks/MenuScriptBlock";
import { HomeHeaderBlock } from "@components/screens/HomeScreen/HomeHeaderBlock";
import { Dimension } from "@constants";
import { Center, Text, Divider, HStack, VStack } from "native-base";
import React, { useState } from "react";

type HomeScreenProps = {};

const HomeScreen = ({}: HomeScreenProps) => {
  const [selectedTime, setSelectedTime] = useState(() => {
    let date = new Date();
    date.setDate(1);
    return date;
  });

  const dummyString = "display the same for all devices";
  return (
    <>
      <HomeHeaderBlock
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />
      {/* 원고지 */}
      <MenuScriptBlock scriptsString={dummyString} />
    </>
  );
};

export default HomeScreen;
