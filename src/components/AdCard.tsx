import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Heading, HStack, Image, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { api } from "@services/api";

import { ProductDTO } from "@dtos/ProductDTO";

import { UserPhoto } from "./UserPhoto";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type Props = {
  product_id: string;
};

export function AdCard({ product_id }: Props) {
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleAdDetailsNavigate() {
    navigation.navigate("adDetails", { id: product_id });
  }

  async function fecthAdDetails() {
    try {
      const { data } = await api.get(`/products/${product_id}`);

      setProduct(data);
      setIsLoading(false);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fecthAdDetails();
  }, []);

  return isLoading ? (
    <></>
  ) : (
    <TouchableOpacity onPress={handleAdDetailsNavigate}>
      <VStack w={34}>
        <Box>
          <Image
            source={{
              uri: `${api.defaults.baseURL}/images/${product.product_images[0]?.path}`,
            }}
            alt="Imagem do Produto"
            rounded={6}
            w={34}
            h={24}
            resizeMode="cover"
          />
          <UserPhoto
            position="absolute"
            top={1}
            left={1}
            source={{
              uri: `${api.defaults.baseURL}/images/${product.user.avatar}`,
            }}
            size={7}
            borderColor="gray.700"
          />
          <Box
            bg={product.is_new ? "blue.700" : "gray.200"}
            w={16}
            alignItems="center"
            py={1}
            rounded="full"
            position="absolute"
            top={1}
            right={1}
          >
            <Heading fontFamily="heading" fontSize="xs" color="white">
              {product.is_new ? "NOVO" : "USADO"}
            </Heading>
          </Box>
        </Box>
        <Text mt={1} fontSize="md" color="gray.200">
          {product.name}
        </Text>
        <HStack>
          <Heading fontFamily="heading" fontSize="lg" color="gray.200">
            <Heading fontFamily="heading" fontSize="sm" color="gray.200">
              R$
            </Heading>{" "}
            {product.price}
          </Heading>
        </HStack>
      </VStack>
    </TouchableOpacity>
  );
}
