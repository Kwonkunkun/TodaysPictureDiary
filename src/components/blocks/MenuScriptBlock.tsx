import React, { useState } from "react";
import { Center, Text, Divider, HStack, VStack, View } from "native-base";
import { transform } from "@babel/core";

type MenuScriptBlockProps = {
  scriptsString: string;
};

const MenuScriptBlock = ({ scriptsString }: MenuScriptBlockProps) => {
  const [scripts, setScripts] = useState(() => {
    const result = Array.from(Array<Array<string>>(5), () =>
      Array<string>(10).fill(" ")
    );

    //문자넣어주기
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 10; j++) {
        const idx = i * 10 + j;
        if (idx < scriptsString.length) {
          result[i][j] = scriptsString[idx];
        }
      }
    }

    return result;
  });

  return (
    <VStack divider={<Divider />}>
      {/* 이건 무조건 있는값이라 !넣었음 */}
      {scripts!.map((script, idx) => (
        <HStack justifyContent="center" key={idx}>
          {script.map((word, idx) => (
            <Center
              bg="amber.50"
              style={{
                borderWidth: 0.5,
                width: "10%",
                height: 0,
                paddingBottom: "10%",
              }}
              key={idx}
            >
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>{word}</Text>
              </View>
            </Center>
          ))}
        </HStack>
      ))}
    </VStack>
  );
};

function chunkString(str: string, length: number) {
  return str.match(new RegExp(".{1," + length + "}", "g"));
}

export default MenuScriptBlock;
