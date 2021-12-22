import React from "react";
import styled from "styled-components/native";
import { ViewStyle } from "react-native";

type PageProps = {
  item: { num: number; color: string };
  style: ViewStyle;
};

const PageItem = styled.View<{ color: string }>`
  background-color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const PageNum = styled.Text``;

export default function Page({ item, style }: PageProps) {
  return (
    <PageItem color={item.color} style={style}>
      <PageNum>{item.num}</PageNum>
    </PageItem>
  );
}
