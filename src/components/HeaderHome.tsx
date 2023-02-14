import { Heading, HStack, Text, useTheme, VStack } from "native-base";
import { Plus } from "phosphor-react-native";

import { Button } from "./Button";
import { UserPhoto } from "./UserPhoto";

export function HeaderHome() {
  const { colors, sizes } = useTheme();

  return (
    <HStack mt={12} justifyContent="space-between">
      <HStack justifyContent="center" mr={12}>
        <UserPhoto size={12} mr={3} />
        <VStack>
          <Text fontSize="md" color="gray.100">
            Boas vindas,
          </Text>
          <Heading fontFamily="heading" fontSize="md" color="gray.100">
            Maria!
          </Heading>
        </VStack>
      </HStack>
      <Button
        flexShrink={1}
        title="Criar anúncio"
        variant="secondary"
        leftIcon={<Plus color={colors.gray[600]} size={sizes[4]} />}
      />
    </HStack>
  );
}
