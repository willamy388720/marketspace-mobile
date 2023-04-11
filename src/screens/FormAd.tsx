import { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  Heading,
  HStack,
  Image,
  Pressable,
  Radio as NativeBaseRadio,
  ScrollView,
  Text,
  useTheme,
  useToast,
  VStack,
} from "native-base";
import { Plus, XCircle } from "phosphor-react-native";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductDTO } from "@dtos/ProductDTO";
import { useNavigation } from "@react-navigation/native";

import { useProduct } from "@hooks/useProduct";

import { HeaderNavigation } from "@components/HeaderNavigation";
import { Button } from "@components/Button";
import RNSwitch from "@components/CustomSwitch";
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { Radio } from "@components/Radio";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { ProductImageDTO } from "@dtos/ProductImageDTO";
import { PaymentMethodsDTO } from "@dtos/PaymentMethodsDTO";
import { Loading } from "@components/Loading";

type FormDataProps = {
  name: string;
  description: string;
  price: string;
};

const formAdSchema = yup.object({
  name: yup.string().required("Informe o nome do produto"),
  description: yup
    .string()
    .required("Informe algum texto para o produto")
    .min(20, "Mínimo de 20 caracteres"),
  price: yup.string().required("Informe o preço do produto"),
});

export function FormAd() {
  const [isLoadingNext, setisLoadingNext] = useState(false);
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [acceptedPayments, setAcceptedPayments] = useState<string[]>([]);
  const [productType, setProductType] = useState("novo");
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const {
    setProduct,
    addProductPhoto,
    productPhotos,
    removeProductPhoto,
    product,
    setProductPhotos,
    removedId,
    setRemovedId,
  } = useProduct();

  const paymentMethods: PaymentMethodsDTO[] = [
    { key: "boleto", name: "Boleto" },
    { key: "pix", name: "Pix" },
    { key: "cash", name: "Dinheiro" },
    { key: "card", name: "Cartão de Crédito" },
    { key: "deposit", name: "Depósito Bancário" },
  ];

  const {
    control,
    handleSubmit,
    formState: {
      errors,
      defaultValues = {
        name: product.name,
        description: product.description,
        price: product.price,
      },
    },
  } = useForm<FormDataProps>({
    resolver: yupResolver(formAdSchema),
  });

  const { colors, sizes } = useTheme();

  const toast = useToast();

  async function handleAddProductPhoto() {
    try {
      setisLoadingNext(true);
      await addProductPhoto();
    } catch (error) {
      toast.show({
        title: "Não foi possível selecionar a foto",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setisLoadingNext(false);
    }
  }

  function handleRemoveProductPhoto(index: number, product_id?: string) {
    removeProductPhoto(index);
    if (product_id) {
      let newRemovedId = [...removedId];
      newRemovedId.push(product_id as never);
      setRemovedId(newRemovedId);
    }
  }

  function handlePreviewProduct({ name, description, price }: FormDataProps) {
    let acceptedPayamentsFormated: PaymentMethodsDTO[] = [];
    let productNew: ProductDTO = {} as ProductDTO;

    acceptedPayments.map((key) =>
      acceptedPayamentsFormated.push(
        paymentMethods.filter((methodFilter) => methodFilter.key === key)[0]
      )
    );
    productNew = {
      ...product,
      name,
      description,
      is_new: productType === "novo",
      accept_trade: acceptTrade,
      payment_methods: acceptedPayamentsFormated,
      price: parseFloat(price),
    } as ProductDTO;
    setProduct(productNew);
    navigation.navigate("adDetails", { id: "preview" });
  }

  function handleCancelProduct() {
    setProductPhotos([]);
    navigation.navigate("home");
  }

  useEffect(() => {
    if (product.id) {
      setProductType(product.is_new ? "novo" : "usado");
      setAcceptTrade(product.accept_trade);
      product.payment_methods.map(({ key }) =>
        setAcceptedPayments((prevState) => [...prevState, key])
      );
      let productImages: ProductImageDTO[] = [];
      product.product_images.map((product_image) => {
        productImages.push({
          id: product_image.id,
          path: `${api.defaults.baseURL}/images/${product_image.path}`,
        } as ProductImageDTO);
      });
      setProductPhotos(productImages);
    }
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <VStack flex={1}>
      <ScrollView
        flex={1}
        mt={12}
        pb={7}
        px={6}
        showsVerticalScrollIndicator={false}
      >
        <HeaderNavigation
          marginTop={0}
          goBack
          title={`${product.id ? "Editar" : "Criar"} anúncio`}
        />
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

        <HStack>
          {productPhotos.map((item, index) => (
            <Box
              key={`${item}` + index}
              bg="gray.500"
              w={24}
              h={24}
              rounded={6}
              mt={4}
              mr={2}
              justifyContent="center"
              alignItems="center"
            >
              <Image
                w={24}
                h={24}
                rounded={6}
                alt="Imagem do Produto"
                source={{
                  uri: item.path,
                }}
              />
              <Pressable
                _pressed={{ opacity: 0.2 }}
                style={{ position: "absolute", top: 4, right: 4 }}
                onPress={() => handleRemoveProductPhoto(index, item.id)}
              >
                <XCircle
                  color={colors.gray[200]}
                  size={sizes[6]}
                  weight="fill"
                />
              </Pressable>
            </Box>
          ))}

          {productPhotos.length < 3 && (
            <Pressable
              bg="gray.500"
              w={24}
              h={24}
              rounded={6}
              mt={4}
              justifyContent="center"
              alignItems="center"
              onPress={handleAddProductPhoto}
              _pressed={{
                opacity: 0.2,
              }}
            >
              <Plus color={colors.gray[400]} size={sizes[6]} />
            </Pressable>
          )}
        </HStack>

        <Heading
          color="gray.200"
          fontFamily="heading"
          fontSize="lg"
          mt={8}
          mb={3}
        >
          Sobre o produto
        </Heading>
        <Controller
          name="name"
          control={control}
          defaultValue={defaultValues.name}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Título do anúncio"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue={defaultValues.description}
          render={({ field: { onChange, value } }) => (
            <TextArea
              my={4}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.description?.message}
            />
          )}
        />
        <NativeBaseRadio.Group
          name="myRadioGroup"
          accessibilityLabel="favorite number"
          value={productType}
          onChange={setProductType}
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
        <Controller
          name="price"
          control={control}
          defaultValue={`${defaultValues.price}`}
          render={({ field: { onChange, value } }) => (
            <Input
              onChangeText={onChange}
              value={value}
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
              keyboardType="numeric"
              placeholder="Valor do produto"
              errorMessage={errors.price?.message}
            />
          )}
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
          handleOnPress={() => setAcceptTrade((prevState) => !prevState)}
          value={acceptTrade}
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

        <Checkbox.Group
          onChange={setAcceptedPayments}
          value={acceptedPayments}
          mb={10}
        >
          {paymentMethods.map((item) => (
            <Checkbox
              key={item.key}
              value={item.key}
              my={2}
              size="md"
              _checked={{ bgColor: "blue.100", borderColor: "blue.100" }}
              _text={{ color: "gray.200", fontSize: "lg" }}
            >
              {item.name}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </ScrollView>
      <HStack justifyContent="space-between" py={5} px={6} bg="gray.700">
        <Button
          title="Cancelar"
          variant="primary"
          onPress={handleCancelProduct}
          flexShrink={1}
        />
        <Box w={3}></Box>
        <Button
          title="Avançar"
          variant="secondary"
          flexShrink={1}
          onPress={handleSubmit(handlePreviewProduct)}
          isLoading={isLoadingNext}
        />
      </HStack>
    </VStack>
  );
}
