import { useAuth } from "@hooks/useAuth";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { Home } from "@screens/Home";
import { MyAds } from "@screens/MyAds";
import { useTheme } from "native-base";
import { House, Tag, SignOut } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

type TabRoutes = {
  home: undefined;
  myAds: undefined;
  signOut: undefined;
};

export type TabNavigatorRoutesProps = BottomTabNavigationProp<TabRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<TabRoutes>();

export function TabRoutes() {
  const { colors, sizes } = useTheme();

  const iconSize = sizes[6];

  const { signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
  }

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[200],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          paddingBottom: sizes[7],
          paddingTop: sizes[6],
          backgroundColor: colors.gray[700],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <House
              weight={focused ? "bold" : "regular"}
              color={color}
              size={iconSize}
            />
          ),
        }}
      />
      <Screen
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Tag
              weight={focused ? "bold" : "regular"}
              color={color}
              size={iconSize}
            />
          ),
        }}
      />
      <Screen
        name="signOut"
        component={SignOut}
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleSignOut}
            >
              <SignOut color={colors.red[100]} size={iconSize} />
            </TouchableOpacity>
          ),
        }}
      />
    </Navigator>
  );
}
