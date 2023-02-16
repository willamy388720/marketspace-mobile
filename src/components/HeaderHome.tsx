import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { Heading, HStack, Text, useTheme, VStack } from "native-base";
import { Plus } from "phosphor-react-native";
import { useEffect } from "react";

import { Button } from "./Button";
import { UserPhoto } from "./UserPhoto";

export function HeaderHome() {
  const { colors, sizes } = useTheme();

  const { user } = useAuth();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleAddAdNavigate() {
    navigation.navigate("formAd");
  }

  return (
    <HStack mt={12} justifyContent="space-between">
      <HStack justifyContent="center" mr={12}>
        <UserPhoto
          size={12}
          mr={3}
          source={{
            uri: `${api.defaults.baseURL}/images/${user.avatar}`,
          }}
        />
        <VStack>
          <Text fontSize="md" color="gray.100">
            Boas vindas,
          </Text>
          <Heading fontFamily="heading" fontSize="md" color="gray.100">
            {user.name}
          </Heading>
        </VStack>
      </HStack>
      <Button
        flexShrink={1}
        title="Criar anúncio"
        variant="secondary"
        leftIcon={<Plus color={colors.gray[600]} size={sizes[4]} />}
        onPress={handleAddAdNavigate}
      />
    </HStack>
  );
}
