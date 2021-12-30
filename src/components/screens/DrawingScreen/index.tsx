import { HeaderBlock } from "@components/blocks/HeaderBlock";
import React from "react";
import { Icon, IconButton } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { CanvasBlock } from "./CavasBlock";
import { RootStackScreenProps } from "types/navigation";
import CustomView from "@components/atoms/CustomView";
import { Colors } from "@constants";

const DrawingScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"Drawing">) => {
  return (
    <CustomView>
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
      />
      {/* canvas 자리 */}
      <CanvasBlock
        onOK={(signature?: string) => {
          const base64Img = signature ? signature : "";

          //base64 data를 업데이트 시켜줘야함
          route.params.setBase64Img(base64Img);
          navigation.goBack();
        }}
        defaultData={route.params.base64Img}
      />
    </CustomView>
  );
};

export default DrawingScreen;
