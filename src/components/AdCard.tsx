import { TouchableOpacity } from "react-native";
import { Box, Heading, HStack, Image, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { AdsDTO } from "@dtos/AdsDTO";
import { UserPhoto } from "./UserPhoto";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type Props = {
  ads: AdsDTO;
};

export function AdCard({ ads }: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleAdDetailsNavigate() {
    navigation.navigate("adDetails");
  }

  return (
    <TouchableOpacity onPress={handleAdDetailsNavigate}>
      <VStack w={34}>
        <Box>
          <Image
            source={{ uri: ads.image }}
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
            source={{ uri: ads.user }}
            size={7}
            borderColor="gray.700"
          />
          <Box
            bg={ads.type === "Novo" ? "blue.700" : "gray.200"}
            w={16}
            alignItems="center"
            py={1}
            rounded="full"
            position="absolute"
            top={1}
            right={1}
          >
            <Heading fontFamily="heading" fontSize="xs" color="white">
              {ads.type.toUpperCase()}
            </Heading>
          </Box>
        </Box>
        <Text mt={1} fontSize="md" color="gray.200">
          {ads.title}
        </Text>
        <HStack>
          <Heading fontFamily="heading" fontSize="lg" color="gray.200">
            <Heading fontFamily="heading" fontSize="sm" color="gray.200">
              R$
            </Heading>{" "}
            {ads.price}
          </Heading>
        </HStack>
      </VStack>
    </TouchableOpacity>
  );
}
