import { HeaderBlock } from "@components/blocks/HeaderBlock";
import PictureDiaryDetail from "@components/blocks/PictureDiaryDetail";
import { Spaces } from "@constants";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Center, Icon, IconButton } from "native-base";
import React from "react";

type CreateAndEditDiaryScreenProps = {};

const CreateAndEditDiaryScreen = ({}: CreateAndEditDiaryScreenProps) => {
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
        rightComponent={
          <IconButton
            icon={
              <Icon
                as={<MaterialIcons name="check" />}
                size="sm"
                color="white"
              />
            }
          />
        }
      />
      <Center m={Spaces.padding} borderWidth={0.3}>
        <PictureDiaryDetail
          pictureDiary={{
            time: "2021년 04월 01일",
            weather: "sun",
            title: "집에 가고 싶어요",
            base64Img: "",
            content: "집에 가면 좋아요",
          }}
        />
      </Center>
    </>
  );
};

export default CreateAndEditDiaryScreen;
