import React, { useRef, useState } from "react";
import {
  Button,
  Center,
  HStack,
  Icon,
  IconButton,
  Slider,
  View,
  VStack,
} from "native-base";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";
import { Colors, Spaces } from "@constants";
import ColorPalette from "react-native-color-palette";
import CustomButton from "@components/atoms/CustomButton";
import CustomView from "@components/atoms/CustomView";

type CavasBlockProps = {
  defaultData: string;
  onOK: (signature?: string) => void;
};
export const CanvasBlock = ({ defaultData, onOK }: CavasBlockProps) => {
  const [selectedColor, setSelectedColor] = useState("#000000");
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
  // .m-signature-pad--footer {display: none; margin: 0px; }

  const style = `.m-signature-pad {box-shadow: none;  } 
              .m-signature-pad--body {border: none;, margin: 0; }
              .m-signature-pad--footer {display: none; margin: 0px; padding: 0px}
                `;

  const webStyle = `.m-signature-pad {
                  flex: 1;
                  box-shadow: none;
                  border-radius: 10px;
                }
                .m-signature-pad--footer {
                  display: none;
                }`;

  return (
    <VStack flex={1}>
      <Center flex={3}>
        <SignatureScreen
          ref={ref}
          onOK={handleSignature}
          onEmpty={handleEmpty}
          onClear={handleClear}
          autoClear={true}
          backgroundColor={Colors.snow}
          webStyle={style}
          penColor={selectedColor}
          minWidth={2}
          maxWidth={2}
          dataURL={defaultData !== "" ? defaultData : undefined}
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
          {/* color picker, all clear 넣으면 됨 */}
          <VStack space="md" alignContent="space-between">
            {/* pallette */}
            <ColorPalette
              titleStyles={{ display: "none" }}
              onChange={(color: string) => {
                setSelectedColor(color);
                ref && ref.current?.changePenColor(color);
              }}
              value={selectedColor}
              colors={["#000000", "#ffffff", "#c52b2b", "#40d164", "#2282ff"]}
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
