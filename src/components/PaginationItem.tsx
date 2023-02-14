import { useTheme } from "native-base";
import * as React from "react";
import { View, Dimensions } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  index: number;
  length: number;
  animValue: Animated.SharedValue<number>;
};

export function PaginationItem({ index, length, animValue }: Props) {
  const { colors } = useTheme();

  const width = Dimensions.get("window").width;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  }, [animValue, index, length]);

  return (
    <View
      style={{
        flexShrink: 1,
        backgroundColor: colors.gray[700],
        width,
        height: 3,
        borderRadius: 50,
        overflow: "hidden",
        marginRight: index === length - 1 ? 0 : 4,
        transform: [
          {
            rotateZ: "0deg",
          },
        ],
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor: colors.gray[300],
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
}
