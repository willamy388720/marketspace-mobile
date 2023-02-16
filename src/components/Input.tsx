import { ReactNode, useState } from "react";
import {
  Input as NativeBaseInput,
  IInputProps,
  Pressable,
  useTheme,
  FormControl,
  Text,
} from "native-base";
import { Eye, EyeSlash } from "phosphor-react-native";

type Props = IInputProps & {
  isShowPassword?: boolean;
  errorMessage?: string | null;
  InputRightComponent?: JSX.Element;
};

export function Input({
  isShowPassword = true,
  errorMessage = null,
  isInvalid,
  type = "text",
  InputRightComponent = <></>,
  ...rest
}: Props) {
  const [showPassword, setShowPassword] = useState(isShowPassword);

  const invalid = !!errorMessage || isInvalid;

  const { colors, sizes } = useTheme();

  return (
    <FormControl>
      <NativeBaseInput
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
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500",
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
            InputRightComponent
          )
        }
        {...rest}
      />
      {errorMessage && (
        <Text color="red.500" fontSize="sm">
          {errorMessage}
        </Text>
      )}
    </FormControl>
  );
}
