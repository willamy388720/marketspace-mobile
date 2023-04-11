import { TouchableOpacity } from "react-native";
import { Heading, HStack, Text, useTheme, VStack } from "native-base";
import { ArrowRight, Tag } from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";

import { TabNavigatorRoutesProps } from "@routes/tab.routes";

type Props = {
  productsActivesCont: number;
};

export function MyAdsButton({ productsActivesCont }: Props) {
  const { colors, sizes } = useTheme();

  const navigation = useNavigation<TabNavigatorRoutesProps>();

  function handleMyAdsNavigate() {
    navigation.navigate("myAds");
  }
  return (
    <HStack
      bg="blue.200"
      px={3}
      py={5}
      borderRadius={6}
      justifyContent="space-between"
      alignItems="center"
    >
      <HStack alignItems="center">
        <Tag color={colors.blue[700]} size={sizes[6]} />
        <VStack ml={4}>
          <Heading fontFamily="heading" fontSize="lg" color="gray.200">
            {productsActivesCont}
          </Heading>
          <Text fontSize="sm" color="gray.200">
            anúncios ativos
          </Text>
        </VStack>
      </HStack>
      <TouchableOpacity onPress={handleMyAdsNavigate}>
        <HStack alignItems="center">
          <Heading fontSize="sm" color={colors.blue[700]} mr={2}>
            Meus anúncios
          </Heading>
          <ArrowRight color={colors.blue[700]} size={sizes[4]} />
        </HStack>
      </TouchableOpacity>
    </HStack>
  );
}
