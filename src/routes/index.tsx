import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useTheme } from "native-base";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const { colors } = useTheme();

  const theme = DefaultTheme;

  theme.colors.background = colors.gray[600];

  return (
    <NavigationContainer>
      <AppRoutes />
      {/* <AuthRoutes /> */}
    </NavigationContainer>
  );
}
