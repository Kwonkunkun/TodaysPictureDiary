import CustomButton from "@components/atoms/CustomButton";
import StyledBoldText from "@components/atoms/StyledBoldText";
import { Colors, Sizes, Spaces } from "@constants";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Icon, IconButton, Input, Stack } from "native-base";
import React, { useState } from "react";

type SignInBlockProps = {
  handleOnPressFindPasswordButton: () => void;
  handleOnPressSignInButton: (email: string, password: string) => void;
  handleOnPressSignUpButton: () => void;
};

const SignInBlock = ({
  handleOnPressFindPasswordButton,
  handleOnPressSignInButton,
  handleOnPressSignUpButton,
}: SignInBlockProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onPressSignInButton = () => {
    handleOnPressSignInButton(email, password);
  };

  return (
    <Stack space={0} w="100%" alignItems="center" p={Spaces.padding}>
      <Input
        onChangeText={setEmail}
        autoFocus
        borderBottomLeftRadius={"none"}
        borderBottomRightRadius={"none"}
        bg={Colors.white}
        InputLeftElement={
          <Icon
            as={<MaterialIcons name="email" />}
            size={5}
            ml="2"
            color="muted.400"
          />
        }
        placeholder="Email"
        fontSize={Sizes.bigText}
        fontFamily={"young-child-bold"}
      />
      <Input
        onChangeText={setPassword}
        borderTopLeftRadius={"none"}
        borderTopRightRadius={"none"}
        bg={Colors.white}
        InputLeftElement={
          <Icon
            as={<MaterialIcons name="vpn-key" />}
            size={5}
            ml="2"
            color="muted.400"
          />
        }
        InputRightElement={
          <IconButton
            onPress={() => {
              setIsPasswordVisible(!isPasswordVisible);
            }}
            icon={
              <Icon
                as={
                  <MaterialIcons
                    name={isPasswordVisible ? "visibility" : "visibility-off"}
                  />
                }
                size={5}
                mr="2"
                color="muted.400"
              />
            }
          />
        }
        type={isPasswordVisible ? undefined : "password"}
        placeholder="Password"
        fontSize={Sizes.bigText}
        fontFamily={"young-child-bold"}
      />
      <Button
        onPress={handleOnPressFindPasswordButton}
        variant="ghost"
        alignSelf={"flex-end"}
      >
        <StyledBoldText
          style={{ fontSize: Sizes.smallText, color: Colors.gray }}
        >
          비밀번호 찾기
        </StyledBoldText>
      </Button>

      <CustomButton
        innerText="로그인"
        handleOnPressButton={onPressSignInButton}
        style={{
          width: "100%",
        }}
      />

      <Button
        variant="ghost"
        alignSelf={"flex-end"}
        onPress={handleOnPressSignUpButton}
      >
        <StyledBoldText
          style={{ fontSize: Sizes.smallText, color: Colors.gray }}
        >
          아직 회원이 아니신가요? 회원가입
        </StyledBoldText>
      </Button>
    </Stack>
  );
};

export default SignInBlock;
