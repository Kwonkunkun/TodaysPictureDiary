import { HeaderBlock } from "@components/blocks/HeaderBlock";
import React from "react";
import { Icon, IconButton } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { CanvasBlock } from "./CavasBlockProps";

const DrawingScreen = () => {
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
      />
      {/* canvas 자리 */}
      <CanvasBlock
        onOK={(signature?: string) => {
          console.log(signature);
        }}
      />
    </>
  );
};

export default DrawingScreen;
