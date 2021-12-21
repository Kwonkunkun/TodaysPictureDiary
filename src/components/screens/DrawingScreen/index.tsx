import { HeaderBlock } from "@components/blocks/HeaderBlock";
import React from "react";
import { Icon, IconButton } from "native-base";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { CanvasBlock } from "./CavasBlock";
import { RootStackScreenProps } from "types/navigation";

const DrawingScreen = ({ navigation }: RootStackScreenProps<"Drawing">) => {
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
      />
      {/* canvas 자리 */}
      <CanvasBlock
        onOK={(signature?: string) => {
          console.log(signature);
          navigation.goBack();
        }}
      />
    </>
  );
};

export default DrawingScreen;
