import { TouchableOpacity } from "react-native";
import { Box, Heading, HStack, useTheme } from "native-base";
import { ArrowLeft } from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";
import { useProduct } from "@hooks/useProduct";
import { ProductDTO } from "@dtos/ProductDTO";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type Props = {
  goBack?: boolean;
  title?: string | null;
  buttonRight?: () => JSX.Element | null;
  marginTop?: number;
  marginBottom?: number;
  paddingHorizontal?: number;
};

export function HeaderNavigation({
  goBack = false,
  title,
  buttonRight,
  marginTop = 12,
  paddingHorizontal = 0,
  marginBottom = 0,
}: Props) {
  const { colors, sizes } = useTheme();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { setProduct, setProductPhotos } = useProduct();

  function handleGoBack() {
    setProduct({} as ProductDTO);
    setProductPhotos([]);
    navigation.navigate("home");
  }

  return (
    <HStack
      mt={marginTop}
      px={paddingHorizontal}
      mb={marginBottom}
      justifyContent="space-between"
      alignItems="center"
    >
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
