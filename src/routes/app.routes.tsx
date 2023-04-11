import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { AdDetails } from "@screens/AdDetails";
import { FormAd } from "@screens/FormAd";
import { TabRoutes } from "./tab.routes";

type AppRoutes = {
  tab: undefined;
  adDetails: { id: string };
  formAd: { id: string } | undefined;
  home: undefined;
  myAds: undefined;
  signOut: undefined;
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="tab" component={TabRoutes} />
      <Screen name="adDetails" component={AdDetails} />
      <Screen name="formAd" component={FormAd} />
    </Navigator>
  );
}
