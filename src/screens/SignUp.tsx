import { useState } from "react";
import {
  Box,
  Heading,
  Button as NativeBaseButton,
  Image,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useTheme,
  useToast,
} from "native-base";
import { PencilSimpleLine } from "phosphor-react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { api } from "@services/api";

import { useAuth } from "@hooks/useAuth";

import Logo from "@assets/Logo.png";
import UserPhotoDefault from "@assets/userPhotoDefault.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { UserPhoto } from "@components/UserPhoto";
import { AppError } from "@utils/AppError";

type FormDataProps = {
  name: string;
  email: string;
  tel: string;
  password: string;
  confirm_password: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o seu nome"),
  email: yup
    .string()
    .email("Informe um e-mail válido")
    .required("Informe um e-mail"),
  tel: yup.string().required("Informe um número de telefone"),
  password: yup
    .string()
    .required("Informe a senha")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirm_password: yup
    .string()
    .required("Informe a confirmação da senha")
    .oneOf([yup.ref("password"), ""], "As senhas devem ser iguais"),
});

export function SignUp() {
  const [userPhoto, setUserPhoto] = useState("");
  const [userPhotoType, setUserPhotoType] = useState();
  const [isLoadingUserPhoto, setIsLoadingUserPhoto] = useState(false);
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);

  const { signIn } = useAuth();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { colors, sizes } = useTheme();

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  function handleNavigateSignIn() {
    navigation.navigate("signIn");
  }

  async function handlePhotoSelect() {
    try {
      setIsLoadingUserPhoto(true);
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 10) {
          return toast.show({
            title: "Essa imagem é muito grande! Escolha uma imagem menor.",
            placement: "top",
            bgColor: "red.500",
          });
        }
      }

      setUserPhoto(photoSelected.assets[0].uri);
      setUserPhotoType(photoSelected.assets[0].type as any);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível carregar a foto";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.100",
      });
    } finally {
      setIsLoadingUserPhoto(false);
    }
  }

  async function handleSignUp({ name, email, tel, password }: FormDataProps) {
    try {
      setIsLoadingSignUp(true);

      const userPhotoFileExtension = userPhoto.split(".").pop();

      const photoFile = {
        name: `${name}.${userPhotoFileExtension}`.toLowerCase(),
        uri: userPhoto,
        type: `${userPhotoType}/${userPhotoFileExtension}`,
      } as any;

      const userUploadForm = new FormData();

      userUploadForm.append("avatar", photoFile);
      userUploadForm.append("name", name);
      userUploadForm.append("email", email);
      userUploadForm.append("tel", tel);
      userUploadForm.append("password", password);

      await api.post("/users", userUploadForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await signIn(email, password);

      toast.show({
        title: "Conta criada com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      console.log(error);

      const title = isAppError
        ? error.message
        : "Não foi possível criar o usuário, por favor tente novamente.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.100",
      });
    } finally {
      setIsLoadingSignUp(false);
    }
  }

  return (
    <ScrollView flex={1} px={12}>
      <VStack justifyContent="center" alignItems="center" mt={16}>
        <Image source={Logo} alt="Logo" w={16} h={12} mb={3} />
        <Heading fontFamily="heading" fontSize="lg" color="gray.100">
          Boas vindas!
        </Heading>
        <Text fontSize="sm" color="gray.200" textAlign="center">
          Crie sua conta e use o espaço para comprar itens variados e vender
          seus produtos
        </Text>
      </VStack>
      <VStack justifyContent="center" alignItems="center" mt={8}>
        <Box>
          {isLoadingUserPhoto ? (
            <Skeleton
              w={24}
              h={24}
              rounded="full"
              bg="gray.400"
              borderWidth={3}
              borderColor="blue.100"
            />
          ) : (
            <UserPhoto
              size={24}
              source={userPhoto !== "" ? { uri: userPhoto } : UserPhotoDefault}
            />
          )}
          <NativeBaseButton
            position="absolute"
            right={0}
            bottom={0}
            rounded="full"
            w={10}
            h={10}
            bg="blue.100"
            _pressed={{ bgColor: "blue.700" }}
            onPress={handlePhotoSelect}
          >
            <PencilSimpleLine color={colors.gray[600]} size={sizes[4]} />
          </NativeBaseButton>
        </Box>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Nome"
              mt={4}
              value={value}
              onChangeText={onChange}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Email"
              mt={4}
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="tel"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Telefone"
              mt={4}
              value={value}
              onChangeText={onChange}
              keyboardType="phone-pad"
              errorMessage={errors.tel?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Senha"
              mt={4}
              isShowPassword={false}
              type="password"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="confirm_password"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Confirmar senha"
              mt={4}
              isShowPassword={false}
              type="password"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.confirm_password?.message}
            />
          )}
        />

        <Button
          variant="secondary"
          mt={6}
          title="Criar"
          onPress={handleSubmit(handleSignUp)}
          isLoading={isLoadingSignUp}
        />
      </VStack>

      <VStack alignItems="center" mt={12} mb={16}>
        <Text fontSize="sm" color="gray.200">
          Já tem uma conta?
        </Text>
        <Button
          variant="primary"
          mt={4}
          title="Ir para o login"
          onPress={handleNavigateSignIn}
        />
      </VStack>
    </ScrollView>
  );
}
