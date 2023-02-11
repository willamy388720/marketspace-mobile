import { useState } from "react";
import {
  Input as NativeBaseInput,
  IInputProps,
  Pressable,
  useTheme,
  FormControl,
} from "native-base";
import { Eye, EyeSlash } from "phosphor-react-native";

type Props = IInputProps & {
  isShowPassword?: boolean;
  errorMessage?: string | null;
};

export function Input({
  isShowPassword = true,
  errorMessage = null,
  isInvalid,
  type = "text",
  ...rest
}: Props) {
  const [showPassword, setShowPassword] = useState(isShowPassword);

  const invalid = !!errorMessage || isInvalid;

  const { colors, sizes } = useTheme();

  return (
    <FormControl>
      <NativeBaseInput
        {...rest}
        bg="gray.700"
        borderWidth={0}
        color="gray.200"
        fontSize="md"
        fontFamily={"body"}
        px={4}
        h={13}
        type={showPassword ? "text" : "password"}
        placeholderTextColor="gray.400"
        borderRadius={6}
        _focus={{
          bgColor: "gray.700",
          borderWidth: 1,
          borderColor: "gray.300",
        }}
        InputRightElement={
          type === "password" ? (
            <Pressable
              onPress={() => setShowPassword((prevState) => !prevState)}
              mr={4}
            >
              {showPassword ? (
                <Eye color={colors.gray[300]} size={sizes[5]} />
              ) : (
                <EyeSlash color={colors.gray[300]} size={sizes[5]} />
              )}
            </Pressable>
          ) : (
            <></>
          )
        }
      />
    </FormControl>
  );
}
