import { Box, HStack, useTheme } from "native-base";
import { MagnifyingGlass, Sliders } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

export function SearchAndFilter() {
  const { colors, sizes } = useTheme();

  return (
    <HStack mr={4}>
      <TouchableOpacity>
        <MagnifyingGlass color={colors.gray[200]} size={sizes[5]} />
      </TouchableOpacity>
      <Box h={5} borderWidth={1} borderColor="gray.400" mx={3} />
      <TouchableOpacity>
        <Sliders color={colors.gray[200]} size={sizes[5]} />
      </TouchableOpacity>
    </HStack>
  );
}
