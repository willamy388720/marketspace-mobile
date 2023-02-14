import { TouchableOpacity } from "react-native";
import { Box, Heading, HStack, useTheme } from "native-base";
import { ArrowLeft } from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";

type Props = {
  goBack?: boolean;
  title?: string | null;
  buttonRight?: () => JSX.Element | null;
  marginTop?: number;
};

export function HeaderNavigation({
  goBack = false,
  title,
  buttonRight,
  marginTop = 12,
}: Props) {
  const { colors, sizes } = useTheme();

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <HStack mt={marginTop} justifyContent="space-between" alignItems="center">
      {goBack ? (
        <TouchableOpacity onPress={handleGoBack}>
          <ArrowLeft color={colors.gray[100]} size={sizes[6]} />
        </TouchableOpacity>
      ) : (
        <Box></Box>
      )}
      {title ? (
        <Heading fontFamily="heading" fontSize="lg" color="gray.100">
          {title}
        </Heading>
      ) : (
        <Box></Box>
      )}
      {buttonRight ? buttonRight() : <Box></Box>}
    </HStack>
  );
}
