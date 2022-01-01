import { HeaderBlock } from "@components/blocks/HeaderBlock";
import {
  AntDesign,
  Entypo,
  MaterialIcons,
  EvilIcons,
} from "@expo/vector-icons";
import { Icon, IconButton, Spinner } from "native-base";
import React, { useState } from "react";

type PreviewHeaderBlockProps = {
  handleOnPressBackIconButton: () => void;
  handleOnPressMoreIconButton: () => void;
  handleOnPressDownloadIconButton: (clearState: () => void) => void;
};

const PreviewHeaderBlock = ({
  handleOnPressBackIconButton,
  handleOnPressMoreIconButton,
  handleOnPressDownloadIconButton,
}: PreviewHeaderBlockProps) => {
  const [isDownloadComplete, setIsDownloadComplete] = useState(true);

  return (
    <HeaderBlock
      leftComponent={
        <IconButton
          icon={
            <Icon as={<Entypo name="chevron-left" />} size="sm" color="white" />
          }
          onPress={handleOnPressBackIconButton}
        />
      }
      rightComponent={
        <>
          {isDownloadComplete ? (
            <IconButton
              icon={
                <Icon
                  as={<AntDesign name="download" />}
                  size="sm"
                  color="white"
                />
              }
              onPress={() => {
                setIsDownloadComplete(false);
                handleOnPressDownloadIconButton(() => {
                  setIsDownloadComplete(true);
                });
              }}
            />
          ) : (
            <IconButton
              icon={
                <Icon
                  as={<EvilIcons name="spinner-2" />}
                  size="sm"
                  color="white"
                />
              }
            />
          )}
          <IconButton
            icon={
              <Icon
                as={<MaterialIcons name="more-vert" />}
                size="sm"
                color="white"
              />
            }
            onPress={handleOnPressMoreIconButton}
          />
        </>
      }
    />
  );
};

export default PreviewHeaderBlock;
