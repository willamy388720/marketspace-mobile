import { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  Box,
  Heading,
  HStack,
  ScrollView,
  StatusBar,
  Text,
  useTheme,
  useToast,
  VStack,
} from "native-base";
import {
  WhatsappLogo,
  Barcode,
  QrCode,
  Money,
  CreditCard,
  Bank,
  ArrowLeft,
  Tag,
  Trash,
  Power,
  PencilSimpleLine,
} from "phosphor-react-native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { useAuth } from "@hooks/useAuth";
import { useProduct } from "@hooks/useProduct";

import { api } from "@services/api";

import { HeaderNavigation } from "@components/HeaderNavigation";
import { Button } from "@components/Button";
import { PhotoCarousel } from "@components/PhotoCarousel";
import { UserPhoto } from "@components/UserPhoto";
import { AppError } from "@utils/AppError";
import { Loading } from "@components/Loading";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type RouteParams = {
  id: string;
};

export function AdDetails() {
  const [isLoadingPublishe, setIsLoadingPublishe] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { colors, sizes } = useTheme();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const routes = useRoute();
  const { id } = routes.params as RouteParams;

  const { user } = useAuth();

  const { product, productPhotos, setProduct } = useProduct();

  const toast = useToast();

  function renderMethodIcon(method: string) {
    switch (method) {
      case "boleto":
        return <Barcode color={colors.gray[100]} size={sizes[7]} />;
      case "card":
        return <CreditCard color={colors.gray[100]} size={sizes[7]} />;
      case "pix":
        return <QrCode color={colors.gray[100]} size={sizes[7]} />;
      case "cash":
        return <Money color={colors.gray[100]} size={sizes[7]} />;
      case "deposit":
        return <Bank color={colors.gray[100]} size={sizes[7]} />;
    }
  }

  function handleGoBack() {
    navigation.navigate("formAd");
  }

  async function publishProductPhots(product_id: string) {
    try {
      let photoFiles: any[] = [];
      let photoExtension;

      productPhotos.map((photo, index) => {
        if (photo.path && photo.type) {
          photoExtension = photo.path?.split(".").pop();
          photoFiles.push({
            name: `${product.name}${index}.${photoExtension}`.toLowerCase(),
            uri: photo.path,
            type: `${photo.type}/${photoExtension}`,
          } as any);
        }
      });

      const productPhotoFormData = new FormData();

      photoFiles.map((file) => {
        productPhotoFormData.append("images", file);
      });

      productPhotoFormData.append("product_id", product_id);

      await api.post("/products/images", productPhotoFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async function handlePublishProduct() {
    try {
      let acceptedPaymentMethods: string[] = [];

      product.payment_methods.map((paymentMethod) => {
        acceptedPaymentMethods.push(paymentMethod.key);
      });
      setIsLoadingPublishe(true);

      const { data } = product.id
        ? await api.put(`/products/${product.id}`, {
            ...product,
            payment_methods: acceptedPaymentMethods,
          })
        : await api.post(`/products`, {
            ...product,
            payment_methods: acceptedPaymentMethods,
          });

      await publishProductPhots(data.id);

      toast.show({
        title: "Produto enviado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });

      navigation.navigate("home");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Erro ao publicar produto";

      toast.show({
        title: title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoadingPublishe(false);
    }
  }

  async function fecthAdDetails() {
    try {
      const { data } = await api.get(`/products/${id}`);

      setProduct(data);
      setIsLoading(false);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Erro ao carregar produto";

      toast.show({
        title: title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteProduct() {
    try {
      setIsLoadingDelete(true);

      await api.delete(`/products/${product.id}`);

      toast.show({
        title: "Produto removido com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });

      navigation.goBack();
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Erro ao deletar produto";

      toast.show({
        title: title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  function handleEditProduct() {
    navigation.navigate("formAd", { id: product.id });
  }

  useEffect(() => {
    if (id !== "preview") {
      fecthAdDetails();
    }
    setIsLoading(false);
  }, []);

  return (
    <VStack flex={1}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ScrollView
            flex={1}
            mt={id === "preview" ? 5 : 12}
            pb={product.user_id === user.id ? 0 : 7}
            showsVerticalScrollIndicator={false}
          >
            {id === "preview" ? (
              <VStack
                bg="blue.100"
                pb={4}
                pt={8}
                justifyContent="center"
                alignItems="center"
              >
                <StatusBar backgroundColor={colors.blue[100]} />
                <Heading
                  fontFamily="heading"
                  fontSize="lg"
                  color="gray.700"
                  mb={0}
                >
                  Pré visualização do anúncio
                </Heading>
                <Text fontFamily="body" fontSize="md" color="gray.700">
                  É assim que seu produto vai aparecer!
                </Text>
              </VStack>
            ) : (
              <HeaderNavigation
                marginTop={0}
                paddingHorizontal={6}
                marginBottom={3}
                goBack
                buttonRight={() =>
                  product.user_id === user.id ? (
                    <TouchableOpacity onPress={handleEditProduct}>
                      <PencilSimpleLine
                        color={colors.gray[200]}
                        size={sizes[6]}
                      />
                    </TouchableOpacity>
                  ) : (
                    <Box></Box>
                  )
                }
              />
            )}
            <PhotoCarousel product_id={product.id} />

            <VStack px={6}>
              <HStack mt={5} alignItems="center">
                <UserPhoto
                  size={8}
                  mr={2}
                  source={{
                    uri: `${api.defaults.baseURL}/images/${product.user?.avatar}`,
                  }}
                />
                <Text color="gray.100" fontSize="md">
                  {product.id ? product.user?.name : user.name}
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
                  {product.is_new ? "NOVO" : "USADO"}
                </Heading>
              </Box>

              <HStack
                justifyContent="space-between"
                alignItems="baseline"
                mt={2}
                mb={2}
              >
                <Heading color="gray.200" fontFamily="heading" fontSize="xl">
                  {product.name}
                </Heading>
                <HStack alignItems="baseline">
                  <Heading color="blue.100" fontFamily="heading" fontSize="md">
                    R$
                  </Heading>
                  <Heading color="blue.100" fontFamily="heading" fontSize="lg">
                    {" "}
                    {product.price}
                  </Heading>
                </HStack>
              </HStack>

              <Text color="gray.300" fontSize="md">
                {product.description}
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
                  {product.accept_trade ? "Sim" : "Não"}
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

              {product.id && (
                <VStack space={2} mb={6}>
                  {product.payment_methods.map((method, index) => (
                    <HStack alignItems="center" key={index}>
                      {renderMethodIcon(method.key)}
                      <Text color={colors.gray[100]} fontSize="lg" ml={2}>
                        {method.name}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              )}
            </VStack>

            {product.user_id === user.id && id !== "preview" && (
              <VStack px={6} mb={7}>
                <Button
                  title="Desativar anúncio"
                  variant="secondary"
                  mb={2}
                  leftIcon={<Power color={colors.gray[600]} size={sizes[4]} />}
                />
                <Button
                  title="Excluir anúncio"
                  variant="primary"
                  isLoading={isLoadingDelete}
                  onPress={handleDeleteProduct}
                  leftIcon={<Trash color={colors.gray[300]} size={sizes[4]} />}
                />
              </VStack>
            )}
          </ScrollView>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            py={product.user_id === user.id && id !== "preview" ? 0 : 5}
            px={product.user_id === user.id && id !== "preview" ? 0 : 6}
            bg="gray.700"
          >
            {id === "preview" ? (
              <HStack>
                <Button
                  title="Voltar e editar"
                  variant="primary"
                  flexShrink={1}
                  onPress={handleGoBack}
                  leftIcon={
                    <ArrowLeft color={colors.gray[200]} size={sizes[4]} />
                  }
                />
                <Box w={3} />
                <Button
                  title="Publicar"
                  variant="default"
                  flexShrink={1}
                  isLoading={isLoadingPublishe}
                  onPress={handlePublishProduct}
                  leftIcon={<Tag color={colors.gray[600]} size={sizes[4]} />}
                />
              </HStack>
            ) : product.user_id === user.id ? (
              <></>
            ) : (
              <>
                <HStack alignItems="baseline">
                  <Heading color="blue.700" fontFamily="heading" fontSize="md">
                    R$
                  </Heading>
                  <Heading
                    color="blue.700"
                    fontFamily="heading"
                    fontSize="xl"
                    mr={16}
                  >
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
              </>
            )}
          </HStack>
        </>
      )}
    </VStack>
  );
}
