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

export default function App() {
  const [fontLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor="transparent"
        translucent
      />
      {fontLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}
