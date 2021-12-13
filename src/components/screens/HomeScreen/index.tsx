import { HomeHeaderBlock } from "@components/screens/HomeScreen/HomeHeaderBlock";
import React, { useState } from "react";

type HomeScreenProps = {};

const HomeScreen = ({}: HomeScreenProps) => {
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
      />
    </>
  );
};

export default HomeScreen;
