import { Image, ScrollView, Text, VStack } from "native-base";

import Logo from "@assets/Logo.png";
import Marketspace from "@assets/marketspace..svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNavigateSignUp() {
    navigation.navigate("signUp");
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
          <Input placeholder="Email" mt={4} />
          <Input
            placeholder="Senha"
            mt={4}
            isShowPassword={false}
            type="password"
          />
          <Button variant="default" mt={8} title="Entrar" />
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
