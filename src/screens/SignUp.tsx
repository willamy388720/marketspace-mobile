import {
  Box,
  Heading,
  Button as NativeBaseButton,
  Image,
  ScrollView,
  Text,
  VStack,
  useTheme,
} from "native-base";
import { PencilSimpleLine } from "phosphor-react-native";

import Logo from "@assets/Logo.png";
import UserPhotoDefault from "@assets/userPhotoDefault.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { UserPhoto } from "@components/UserPhoto";

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { colors, sizes } = useTheme();

  function handleNavigateSignIn() {
    navigation.navigate("signIn");
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
          <UserPhoto size={24} source={UserPhotoDefault} />
          <NativeBaseButton
            position="absolute"
            right={0}
            bottom={0}
            rounded="full"
            w={10}
            h={10}
            bg="blue.100"
            _pressed={{ bgColor: "blue.700" }}
          >
            <PencilSimpleLine color={colors.gray[600]} size={sizes[4]} />
          </NativeBaseButton>
        </Box>
        <Input placeholder="Nome" mt={4} />
        <Input placeholder="Email" mt={4} />
        <Input placeholder="Telefone" mt={4} />
        <Input
          placeholder="Senha"
          mt={4}
          isShowPassword={false}
          type="password"
        />
        <Input
          placeholder="Confirmar senha"
          mt={4}
          isShowPassword={false}
          type="password"
        />
        <Button variant="secondary" mt={6} title="Criar" />
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
