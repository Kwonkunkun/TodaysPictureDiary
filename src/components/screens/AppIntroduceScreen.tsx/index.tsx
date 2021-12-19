import { HeaderBlock } from "@components/blocks/HeaderBlock";
import { Entypo } from "@expo/vector-icons";
import { Center, Icon, IconButton } from "native-base";

import React from "react";
import { Dimension } from "@constants";
import { Carousel } from "./Carousel";

const AppIntroduceScreen = () => {
  return (
    <>
      <HeaderBlock
        leftComponent={
          <IconButton
            icon={
              <Icon
                as={<Entypo name="chevron-left" />}
                size="sm"
                color="white"
              />
            }
          />
        }
        // rightComponent={
        //   <IconButton
        //     icon={
        //       <Icon
        //         as={<AntDesign name="question" />}
        //         size="sm"
        //         color="white"
        //       />
        //     }
        //   />
        // }
      />
      <Center flex={1}>
        <Carousel
          gap={16}
          offset={36}
          pages={PAGES}
          pageWidth={Dimension.window.width - (16 + 36) * 2}
        />
      </Center>
    </>
  );
};

export default AppIntroduceScreen;

const PAGES = [
  {
    num: 0,
    color: "#86E3CE",
  },
  {
    num: 1,
    color: "#D0E6A5",
  },
  {
    num: 2,
    color: "#FFDD94",
  },
  {
    num: 3,
    color: "#FA897B",
  },
  {
    num: 4,
    color: "#CCABD8",
  },
];
