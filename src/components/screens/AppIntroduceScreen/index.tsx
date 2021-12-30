import { HeaderBlock } from "@components/blocks/HeaderBlock";
import { Entypo } from "@expo/vector-icons";
import { Center, Icon, IconButton } from "native-base";

import React from "react";
import { Dimension } from "@constants";
import { Carousel } from "./Carousel";
import { RootStackScreenProps } from "types/navigation";

const AppIntroduceScreen = ({
  navigation,
}: RootStackScreenProps<"AppIntroduce">) => {
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
            onPress={() => {
              navigation.goBack();
            }}
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
          offset={30}
          pages={PAGES}
          pageWidth={Dimension.window.width - (16 + 30) * 2}
        />
      </Center>
    </>
  );
};

export default AppIntroduceScreen;

const PAGES = [
  {
    num: 0,
    color: "#98DDCA",
    imgSource: require("@assets/images/appIntro1.png"),
  },
  {
    num: 1,
    color: "#D5ECC2",
    imgSource: require("@assets/images/appIntro2.png"),
  },
  {
    num: 2,
    color: "#FFD3B4",
    imgSource: require("@assets/images/appIntro3.png"),
  },
  // {
  //   num: 3,
  //   color: "#FFAAA7",
  // },
];
