import { StatusBar } from "react-native";
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";
import { NativeBaseProvider } from "native-base";

import { Loading } from "@components/Loading";
import { theme } from "./src/theme";
import { Routes } from "@routes/index";
import { AuthContexProvider } from "@contexts/AuthContext";

export default function App() {
  const [fontLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor="transparent"
        translucent
      />
      <AuthContexProvider>
        {fontLoaded ? <Routes /> : <Loading />}
      </AuthContexProvider>
    </NativeBaseProvider>
  );
}
