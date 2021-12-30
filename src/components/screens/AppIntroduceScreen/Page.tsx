import React from "react";
import styled from "styled-components/native";
import { ViewStyle } from "react-native";
import { Image, Heading, Center, Text, Flex } from "native-base";

type PageProps = {
  item: { num: number; color: string; imgSource: any };
  style: ViewStyle;
};

const PageItem = styled.View<{ color: string }>`
  background-color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

export default function Page({ item, style }: PageProps) {
  return (
    <PageItem color={item.color} style={style}>
      <Image resizeMode={"contain"} source={item.imgSource} />
    </PageItem>
  );
}
