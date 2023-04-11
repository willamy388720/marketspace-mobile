import { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import {
  Box,
  FlatList,
  Heading,
  HStack,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { Plus } from "phosphor-react-native";

import { AdCard } from "@components/AdCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Select } from "@components/Select";
import { HeaderNavigation } from "@components/HeaderNavigation";
import { useProduct } from "@hooks/useProduct";

export function MyAds() {
  const { colors, sizes } = useTheme();

  const { myProducts, fetchMyProducts } = useProduct();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleAddAdNavigate() {
    navigation.navigate("formAd");
  }

  useFocusEffect(
    useCallback(() => {
      fetchMyProducts();
    }, [])
  );

  return (
    <VStack flex={1} px={6}>
      <HeaderNavigation
        title="Meus anúncios"
        buttonRight={() => (
          <TouchableOpacity onPress={handleAddAdNavigate}>
            <Plus color={colors.gray[100]} size={sizes[6]} />
          </TouchableOpacity>
        )}
      />

      <VStack mt={8} flex={1}>
        <FlatList
          data={myProducts}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <HStack justifyContent="space-between" alignItems="center">
              <Text color="gray.200" fontSize="sm">
                {myProducts.length} anúncios
              </Text>
              <Select />
            </HStack>
          )}
          renderItem={({ item }) => <AdCard product_id={item.id} />}
          numColumns={2}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: "space-between",
            marginBottom: 24,
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Heading
              flex={1}
              justifyContent="center"
              fontFamily="heading"
              textAlign="center"
            >
              Nenhum anúncio cadastrado
            </Heading>
          )}
          mt={6}
        />
      </VStack>
    </VStack>
  );
}
