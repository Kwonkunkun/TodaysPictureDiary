import React, { useRef, useState } from "react";
import {
  Button,
  Center,
  HStack,
  IconButton,
  Slider,
  VStack,
} from "native-base";
import { Entypo, Ionicons } from "@expo/vector-icons";
import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";
import { Colors } from "@constants";
import ColorPalette from "react-native-color-palette";

type CavasBlockProps = {
  onOK: (signature?: string) => void;
};
export const CanvasBlock = ({ onOK }: CavasBlockProps) => {
  const [selectedColor, setSelectedColor] = useState("#C0392B");
  const ref = useRef<SignatureViewRef>(null);

  const handleSignature = (signature?: string) => {
    console.log(signature);
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

  const style = `.m-signature-pad {box-shadow: none; } 
              .m-signature-pad--body {border: none;, margin: 0}
              .m-signature-pad--footer {display: none; margin: 0px;}
             `;

  return (
    <VStack flex={1}>
      <Center flex={3}>
        <SignatureScreen
          ref={ref}
          onOK={handleSignature}
          onEmpty={handleEmpty}
          onClear={handleClear}
          autoClear={true}
          backgroundColor={Colors.white}
          webStyle={style}
          penColor={selectedColor}
          minWidth={2}
          maxWidth={2}
        />
      </Center>
      <VStack
        space="sm"
        flex={2}
        backgroundColor={Colors.white}
        alignItems="center"
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
          {/* color picker, all clear 넣으면 됨 */}
          <VStack space="sm" alignContent="space-between">
            {/* pallette */}
            <ColorPalette
              titleStyles={{ display: "none" }}
              onChange={(color: string) => {
                setSelectedColor(color);
                ref && ref.current?.changePenColor(color);
              }}
              value={selectedColor}
              colors={["#C0392B", "#E74C3C", "#9B59B6", "#8E44AD", "#2980B9"]}
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
              <Slider.Thumb />
            </Slider>
            {/* 완료 버튼 */}
            <Button
              onPress={() => {
                ref.current?.readSignature();
              }}
            >
              그리기 완료
            </Button>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};
