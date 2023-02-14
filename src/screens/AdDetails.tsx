import {
  Box,
  Checkbox,
  Heading,
  HStack,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from "native-base";
import {
  WhatsappLogo,
  Barcode,
  QrCode,
  Money,
  CreditCard,
  Bank,
} from "phosphor-react-native";

import { HeaderNavigation } from "@components/HeaderNavigation";
import { Button } from "@components/Button";
import { PhotoCarousel } from "@components/PhotoCarousel";
import { UserPhoto } from "@components/UserPhoto";

export function AdDetails() {
  const { colors, sizes } = useTheme();

  return (
    <VStack flex={1}>
      <ScrollView flex={1} mt={12} pb={7} showsVerticalScrollIndicator={false}>
        <HeaderNavigation
          marginTop={0}
          paddingHorizontal={6}
          marginBottom={3}
          goBack
        />
        <PhotoCarousel />

        <VStack px={6}>
          <HStack mt={5} alignItems="center">
            <UserPhoto size={8} mr={2} />
            <Text color="gray.100" fontSize="md">
              Makenna Baptista
            </Text>
          </HStack>

          <Box
            mt={6}
            py={1}
            bg="gray.500"
            w={16}
            alignItems="center"
            rounded={"full"}
          >
            <Heading fontFamily="heading" color="gray.100" fontSize="sm">
              NOVO
            </Heading>
          </Box>

          <HStack
            justifyContent="space-between"
            alignItems="baseline"
            mt={2}
            mb={2}
          >
            <Heading color="gray.200" fontFamily="heading" fontSize="xl">
              Bicicleta
            </Heading>
            <HStack alignItems="baseline">
              <Heading color="blue.100" fontFamily="heading" fontSize="md">
                R$
              </Heading>
              <Heading color="blue.100" fontFamily="heading" fontSize="lg">
                {" "}
                120,00
              </Heading>
            </HStack>
          </HStack>

          <Text color="gray.300" fontSize="md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            excepturi id ex harum at porro vitae voluptatum voluptates ducimus
            quisquam inventore sunt, consectetur officia quae similique vel nisi
            voluptatibus? Omnis!
          </Text>

          <HStack alignItems="baseline">
            <Heading
              color="gray.200"
              fontFamily="heading"
              fontSize="lg"
              mt={6}
              mr={2}
            >
              Aceita troca?
            </Heading>
            <Text color="gray.300" fontSize="lg">
              Sim
            </Text>
          </HStack>

          <Heading
            color="gray.200"
            fontFamily="heading"
            fontSize="lg"
            mt={6}
            mb={2}
          >
            Meios de pagamento aceitos
          </Heading>

          <VStack space={2} mb={6}>
            <HStack alignItems="center">
              <Barcode color={colors.gray[100]} size={sizes[7]} />
              <Text color={colors.gray[100]} fontSize="lg" ml={2}>
                Boleto
              </Text>
            </HStack>
            <HStack alignItems="center">
              <QrCode color={colors.gray[100]} size={sizes[7]} />
              <Text color={colors.gray[100]} fontSize="lg" ml={2}>
                Pix
              </Text>
            </HStack>
            <HStack alignItems="center">
              <Money color={colors.gray[100]} size={sizes[7]} />
              <Text color={colors.gray[100]} fontSize="lg" ml={2}>
                Dinheiro
              </Text>
            </HStack>
            <HStack alignItems="center">
              <CreditCard color={colors.gray[100]} size={sizes[7]} />
              <Text color={colors.gray[100]} fontSize="lg" ml={2}>
                Cartão de Crédito
              </Text>
            </HStack>
            <HStack alignItems="center">
              <Bank color={colors.gray[100]} size={sizes[7]} />
              <Text color={colors.gray[100]} fontSize="lg" ml={2}>
                Depósito Bancário
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </ScrollView>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        py={5}
        px={6}
        bg="gray.700"
      >
        <HStack alignItems="baseline">
          <Heading color="blue.700" fontFamily="heading" fontSize="md">
            R$
          </Heading>
          <Heading color="blue.700" fontFamily="heading" fontSize="xl" mr={16}>
            {" "}
            120,00
          </Heading>
        </HStack>
        <Button
          title="Entrar em contato"
          variant="default"
          flexShrink={1}
          leftIcon={
            <WhatsappLogo
              weight="fill"
              color={colors.gray[600]}
              size={sizes[4]}
            />
          }
        />
      </HStack>
    </VStack>
  );
}
