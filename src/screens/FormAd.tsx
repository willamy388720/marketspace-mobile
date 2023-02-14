import { useState } from "react";
import {
  Box,
  Checkbox,
  Heading,
  HStack,
  Radio as NativeBaseRadio,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { Plus, Circle } from "phosphor-react-native";

import { HeaderNavigation } from "@components/HeaderNavigation";
import { Button } from "@components/Button";
import RNSwitch from "@components/CustomSwitch";
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { Radio } from "@components/Radio";

export function FormAd() {
  const [value, setValue] = useState(false);

  const { colors, sizes } = useTheme();

  return (
    <VStack flex={1}>
      <ScrollView
        flex={1}
        mt={12}
        pb={7}
        px={6}
        showsVerticalScrollIndicator={false}
      >
        <HeaderNavigation marginTop={0} goBack title="Criar anúncio" />
        <Heading
          color="gray.200"
          fontFamily="heading"
          fontSize="lg"
          mt={6}
          mb={1}
        >
          Imagens
        </Heading>
        <Text color="gray.300" fontSize="md">
          Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
        </Text>
        <Box
          bg="gray.500"
          w={24}
          h={24}
          rounded={6}
          mt={4}
          justifyContent="center"
          alignItems="center"
        >
          <Plus color={colors.gray[400]} size={sizes[6]} />
        </Box>

        <Heading
          color="gray.200"
          fontFamily="heading"
          fontSize="lg"
          mt={8}
          mb={3}
        >
          Sobre o produto
        </Heading>
        <Input placeholder="Título do anúncio" />
        <TextArea my={4} />
        <NativeBaseRadio.Group
          name="myRadioGroup"
          accessibilityLabel="favorite number"
        >
          <HStack w="full">
            <Radio label="Produto novo" value="novo" />
            <Radio label="Produto usado" value="usado" ml={5} />
          </HStack>
        </NativeBaseRadio.Group>

        <Heading
          color="gray.200"
          fontFamily="heading"
          fontSize="lg"
          mt={6}
          mb={3}
        >
          Venda
        </Heading>
        <Input
          leftElement={
            <Text
              ml={4}
              mr={-2}
              color="gray.100"
              fontSize="md"
              fontFamily={"body"}
            >
              R$
            </Text>
          }
          placeholder="Valor do produto"
        />

        <Heading
          color="gray.200"
          fontFamily="heading"
          fontSize="lg"
          mt={6}
          mb={3}
        >
          Aceita troca?
        </Heading>
        <RNSwitch
          handleOnPress={() => setValue((prevState) => !prevState)}
          value={value}
          activeTrackColor={colors.blue[100]}
          inActiveTrackColor={colors.gray[500]}
          thumbColor={colors.gray[700]}
        />

        <Heading
          color="gray.200"
          fontFamily="heading"
          fontSize="lg"
          mt={6}
          mb={3}
        >
          Meios de pagamento aceitos
        </Heading>

        <Checkbox.Group mb={10}>
          <Checkbox
            value="boleto"
            my={2}
            size="md"
            _checked={{ bgColor: "blue.100", borderColor: "blue.100" }}
            _text={{ color: "gray.200", fontSize: "lg" }}
          >
            Boleto
          </Checkbox>
          <Checkbox
            value="pix"
            my={2}
            size="md"
            _checked={{ bgColor: "blue.100", borderColor: "blue.100" }}
            _text={{ color: "gray.200", fontSize: "lg" }}
          >
            Pix
          </Checkbox>
          <Checkbox
            value="dinheiro"
            my={2}
            size="md"
            _checked={{ bgColor: "blue.100", borderColor: "blue.100" }}
            _text={{ color: "gray.200", fontSize: "lg" }}
          >
            Dinheiro
          </Checkbox>
          <Checkbox
            value="cartao"
            my={2}
            size="md"
            _checked={{ bgColor: "blue.100", borderColor: "blue.100" }}
            _text={{ color: "gray.200", fontSize: "lg" }}
          >
            Cartão de Crédito
          </Checkbox>
          <Checkbox
            value="deposito"
            my={2}
            size="md"
            _checked={{ bgColor: "blue.100", borderColor: "blue.100" }}
            _text={{ color: "gray.200", fontSize: "lg" }}
          >
            Depósito Bancário
          </Checkbox>
        </Checkbox.Group>
      </ScrollView>
      <HStack justifyContent="space-between" py={5} px={6} bg="gray.700">
        <Button title="Cancelar" variant="primary" flexShrink={1} />
        <Box w={3}></Box>
        <Button title="Avançar" variant="secondary" flexShrink={1} />
      </HStack>
    </VStack>
  );
}
