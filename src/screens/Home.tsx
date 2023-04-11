import { useCallback, useState } from "react";
import { FlatList, Text, VStack, useDisclose } from "native-base";
import { useFocusEffect } from "@react-navigation/native";

import { api } from "@services/api";

import { useProduct } from "@hooks/useProduct";

import { ProductDTO } from "@dtos/ProductDTO";

import { HeaderHome } from "@components/HeaderHome";
import { MyAdsButton } from "@components/MyAdsButton";
import { Input } from "@components/Input";
import { SearchAndFilter } from "@components/SearchAndFilter";
import { AdCard } from "@components/AdCard";
import { FilterAds } from "@components/FilterAds";
import { QueryDTO } from "@dtos/QueryDTO";

export function Home() {
  const [productsActivesCont, setProductsActivesCont] = useState(0);
  const [products, setProducts] = useState<ProductDTO[]>([] as ProductDTO[]);
  const { isOpen, onOpen, onClose } = useDisclose();

  const { fetchMyProducts, myProducts } = useProduct();

  async function fetchProducts() {
    try {
      const response = await api.get("/products");

      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchMyProducts();
      fetchProducts();
    }, [])
  );

  return (
    <VStack flex={1} px={6}>
      <HeaderHome />
      <VStack mt={8}>
        <Text fontSize="sm" color="gray.300" mb={3}>
          Seus produtos anunciados para venda
        </Text>
        <MyAdsButton
          productsActivesCont={
            myProducts.filter((product) => product.is_active).length
          }
        />
      </VStack>

      <FilterAds isOpen={isOpen} onClose={onClose} />

      <VStack mt={8} flex={1}>
        <Text fontSize="sm" color="gray.300" mb={3}>
          Compre produtos variados
        </Text>
        <Input
          placeholder="Buscar anúncio"
          returnKeyType="search"
          InputRightComponent={<SearchAndFilter onPress={onOpen} />}
        />

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AdCard product_id={item.id} />}
          numColumns={2}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: "space-between",
            marginBottom: 24,
          }}
          showsVerticalScrollIndicator={false}
          mt={6}
        />
      </VStack>
    </VStack>
  );
}
