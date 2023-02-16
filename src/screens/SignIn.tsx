import { useState } from "react";
import { Image, ScrollView, Text, useToast, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { useAuth } from "@hooks/useAuth";

import Logo from "@assets/Logo.png";
import Marketspace from "@assets/marketspace..svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { AppError } from "@utils/AppError";

const signInSchema = yup.object({
  email: yup.string().required("Informe seu e-mail"),
  password: yup.string().required("Informe sua senha"),
});

type FormDataProps = {
  email: string;
  password: string;
};

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(signInSchema) });

  const { signIn } = useAuth();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const toast = useToast();

  function handleNavigateSignUp() {
    navigation.navigate("signUp");
  }

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      await signIn(email, password);
      toast.show({
        title: "Bem-vindo(a)!",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível realizar o login";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollView flex={1} bgColor="gray.700">
      <VStack bgColor="gray.600">
        <VStack justifyContent="center" alignItems="center" mt={24}>
          <Image source={Logo} alt="Logo" w={32} h={16} mb={8} />
          <Marketspace />
          <Text fontSize="sm" color="gray.300">
            Seu espaço de compra e venda
          </Text>
        </VStack>
        <VStack
          justifyContent="center"
          alignItems="center"
          mt={20}
          px={12}
          mb={16}
        >
          <Text fontSize="sm" color="gray.200">
            Acesse sua conta
          </Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Email"
                mt={4}
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                autoCapitalize="none"
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
                returnKeyType="send"
                onSubmitEditing={handleSubmit(handleSignIn)}
              />
            )}
          />
          <Button
            variant="default"
            mt={8}
            title="Entrar"
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
        </VStack>
      </VStack>

      <VStack px={12} alignItems="center" mt={12}>
        <Text fontSize="sm" color="gray.200">
          Ainda não tem acesso?
        </Text>
        <Button
          variant="primary"
          mt={4}
          title="Criar uma conta"
          onPress={handleNavigateSignUp}
        />
      </VStack>
    </ScrollView>
  );
}
