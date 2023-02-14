import {
  Pressable,
  IPressableProps,
  useTheme,
  Heading,
  HStack,
} from "native-base";
import { XCircle } from "phosphor-react-native";

type Props = IPressableProps & {
  title: string;
  isActive: boolean;
};

export function Tag({ title, isActive, ...rest }: Props) {
  const { colors, sizes } = useTheme();

  return (
    <Pressable
      rounded={24}
      bg={"gray.500"}
      _pressed={{
        bg: "blue.100",
      }}
      isPressed={isActive}
      py={2}
      px={6}
      {...rest}
    >
      <HStack alignItems="center" justifyContent="center">
        <Heading
          color={isActive ? "white" : "gray.300"}
          fontSize="md"
          mr={isActive ? 2 : 0}
          fontFamily="heading"
        >
          {title.toUpperCase()}
        </Heading>
        {isActive && (
          <XCircle size={sizes[5]} color={colors.gray[600]} weight="fill" />
        )}
      </HStack>
    </Pressable>
  );
}
