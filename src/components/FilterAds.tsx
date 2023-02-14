import { useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  Actionsheet,
  Box,
  Checkbox,
  Heading,
  HStack,
  IActionsheetProps,
  ScrollView,
  useTheme,
} from "native-base";
import { Button } from "./Button";
import { X } from "phosphor-react-native";

import { Tag } from "./Tag";
import RNSwitch from "./CustomSwitch";

type Props = IActionsheetProps & {
  onClose: () => void;
};

export function FilterAds({ onClose, ...rest }: Props) {
  const [isNew, setIsNew] = useState(false);
  const [isUsed, setIsUsed] = useState(false);
  const [value, setValue] = useState(false);

  const { colors, sizes } = useTheme();

  return (
    <Actionsheet {...rest}>
      <Actionsheet.Content
        _dragIndicator={{ h: 1, w: 16, borderRadius: 2, bg: "gray.400" }}
        px={6}
        py={3}
        bg="gray.600"
      >
        <ScrollView w="full" mt={6} showsVerticalScrollIndicator={false}>
          <HStack justifyContent="space-between" alignItems="center">
            <Heading color="gray.100" fontFamily="heading" fontSize="xl">
              Filtrar anúncios
            </Heading>
            <TouchableOpacity onPress={onClose}>
              <X color={colors.gray[400]} size={sizes[6]} />
            </TouchableOpacity>
          </HStack>

          <Heading
            color="gray.200"
            fontFamily="heading"
            fontSize="lg"
            mt={6}
            mb={3}
          >
            Condição
          </Heading>
          <HStack>
            <Tag
              title="Novo"
              isActive={isNew}
              mr={2}
              onPress={() => setIsNew((prevState) => !prevState)}
            />
            <Tag
              title="Usado"
              isActive={isUsed}
              onPress={() => setIsUsed((prevState) => !prevState)}
            />
          </HStack>

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

          <HStack justifyContent="space-between">
            <Button title="Resetar filtros" variant="primary" flexShrink={1} />
            <Box w={3}></Box>
            <Button
              title="Aplicar filtros"
              variant="secondary"
              flexShrink={1}
            />
          </HStack>
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
}
