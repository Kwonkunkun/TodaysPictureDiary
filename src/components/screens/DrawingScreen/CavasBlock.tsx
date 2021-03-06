import React, { memo, useEffect, useRef, useState } from "react";
import { Center, HStack, Icon, IconButton, Slider, VStack } from "native-base";
import { Entypo, Ionicons } from "@expo/vector-icons";
import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";
import { Colors, Spaces } from "@constants";
import ColorPalette from "react-native-color-palette";
import CustomButton from "@components/atoms/CustomButton";

type CavasBlockProps = {
  defaultData: string;
  onOK: (signature?: string) => void;
};

const webStyle = `.m-signature-pad {
  box-shadow: none; 
  margin-left: 0px;
  margin-top: 0px;
} 
 .m-signature-pad--body
  canvas {
    background-color: ${Colors.snow};
  }
.m-signature-pad--body {border: none}
.m-signature-pad--footer {display: none; margin: 0px;}
body,html {
   width: 100%; 
   height: 100%;
}`;

const CanvasBlock = ({ defaultData, onOK }: CavasBlockProps) => {
  const [selectedColor, setSelectedColor] = useState("#000000");
  let ref = useRef<SignatureViewRef>(null);

  const handleSignature = (signature?: string) => {
    onOK(signature);
  };

  const handleEmpty = () => {
    console.log("Empty");
  };

  const handleClear = () => {
    console.log("clear success!");
  };

  const handleEnd = () => {
    ref.current?.readSignature();
  };

  useEffect(() => {
    console.log("시작한디");
    return () => {};
  }, [defaultData]);

  return (
    <VStack flex={1} bg={Colors.snow}>
      <Center flex={2}>
        <SignatureScreen
          ref={ref}
          onOK={handleSignature}
          onEmpty={handleEmpty}
          onClear={handleClear}
          autoClear={false}
          backgroundColor={Colors.snow}
          webStyle={webStyle}
          penColor={selectedColor}
          minWidth={2}
          maxWidth={2}
          dataURL={defaultData}
          webviewContainerStyle={{ backgroundColor: Colors.subBackground }}
        />
      </Center>
      <VStack
        space="sm"
        flex={2}
        backgroundColor={Colors.white}
        alignItems="center"
        justifyContent={"space-between"}
        style={{ padding: Spaces.padding }}
        safeArea
      >
        {/* undo redo button */}
        <HStack space={5} alignItems="center">
          <IconButton
            icon={
              <Ionicons
                name="arrow-undo-sharp"
                size={20}
                color="black"
                onPress={() => {
                  ref.current?.undo();
                }}
              />
            }
          />
          <IconButton
            icon={
              <Ionicons
                name="arrow-redo-sharp"
                size={20}
                color="black"
                onPress={() => {
                  ref.current?.redo();
                }}
              />
            }
          />
        </HStack>
        <HStack>
          <VStack space="md" alignContent="space-between">
            {/* pallette */}
            <ColorPalette
              titleStyles={{ display: "none" }}
              onChange={(color: string) => {
                setSelectedColor(color);
                ref && ref.current?.changePenColor(color);
              }}
              value={selectedColor}
              colors={[
                "#000000",
                "#ffffff",
                "#393E46",
                "#00ADB5",
                "#9145B6",
                "#c52b2b",
                "#FF8E00",
                "#FFF1BD",
                "#40d164",
                "#2282ff",
                "#fff022",
              ]}
              title={""}
              icon={<Entypo name="circle" size={10} color="white" />}
            />
            {/* slider */}
            <Slider
              defaultValue={2}
              minValue={0}
              maxValue={10}
              accessibilityLabel="hello world"
              step={2}
              onChange={(value) => {
                ref && ref.current?.changePenSize(value, value);
              }}
            >
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb borderWidth="0" bg="transparent">
                <Icon
                  as={Entypo}
                  name="pencil"
                  color={selectedColor}
                  size="sm"
                />
              </Slider.Thumb>
            </Slider>
            {/* 완료 버튼 */}
            <CustomButton
              innerText="그리기 완료"
              handleOnPressButton={() => {
                ref.current?.readSignature();
              }}
            ></CustomButton>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default CanvasBlock;
