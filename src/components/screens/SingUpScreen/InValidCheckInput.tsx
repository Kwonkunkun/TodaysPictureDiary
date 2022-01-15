import { FormControl, Input, Stack, WarningOutlineIcon } from "native-base";
import React, { useEffect, useState } from "react";

/**
 * ValidCheckInput
 */

type InValidCheckInputProps = {
  checkInValid: (text: string) => boolean; //true: invalid, false: valid
  checkTrigger: boolean; //true 일때, checkInValid 함수 실행
  label: string;
  text: string;
  setText: (text: string) => void;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  isMask?: boolean;
  autoFocus?: boolean;
};

const InValidCheckInput = ({
  checkInValid,
  checkTrigger: validCheckTrigger,
  label,
  text,
  setText,
  placeholder,
  helperText,
  errorMessage,
  isMask,
  autoFocus,
}: InValidCheckInputProps) => {
  const [isInValid, setIsInValid] = useState(false);

  useEffect(() => {
    if (validCheckTrigger) {
      setIsInValid(checkInValid(text));
    }
  }, [validCheckTrigger]);

  return (
    <FormControl isInvalid={isInValid}>
      <Stack>
        <FormControl.Label>{label}</FormControl.Label>
        <Input
          autoFocus={autoFocus}
          placeholder={placeholder}
          onChangeText={setText}
          onBlur={() => {
            setIsInValid(checkInValid(text));
          }}
          type={isMask ? "password" : undefined}
        />
        {/* helperText 존재시에만 추가 */}
        {helperText && (
          <FormControl.HelperText>{helperText}</FormControl.HelperText>
        )}
        {errorMessage && (
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errorMessage}
          </FormControl.ErrorMessage>
        )}
      </Stack>
    </FormControl>
  );
};

export default InValidCheckInput;
