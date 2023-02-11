import { IButtonProps, Button as ButtonNativeBase, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
  variant: "default" | "primary" | "secondary";
};

export function Button({ title, variant, ...rest }: Props) {
  const bgColor =
    variant === "default"
      ? "blue.100"
      : variant === "primary"
      ? "gray.500"
      : "gray.100";

  const pressedBgColor =
    variant === "default"
      ? "blue.700"
      : variant === "primary"
      ? "gray.400"
      : "gray.200";

  return (
    <ButtonNativeBase
      w="full"
      bg={bgColor}
      h={13}
      borderRadius={6}
      _pressed={{
        bgColor: pressedBgColor,
      }}
      {...rest}
    >
      <Text
        fontFamily="heading"
        fontSize="sm"
        color={variant === "primary" ? "gray.100" : "gray.700"}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
