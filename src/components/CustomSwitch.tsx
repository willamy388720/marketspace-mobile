import { useTheme } from "native-base";
import { useEffect, useState, useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { interpolateColors, spring } from "react-native-reanimated";

type Props = {
  handleOnPress: () => void;
  activeTrackColor: string;
  inActiveTrackColor: string;
  thumbColor: string;
  value: boolean;
};

const RNSwitch = ({
  handleOnPress,
  activeTrackColor,
  inActiveTrackColor,
  thumbColor,
  value,
}: Props) => {
  const [switchTranslate] = useState(new Animated.Value(0));

  const { sizes } = useTheme();

  const interpolateBackgroundColor = {
    backgroundColor: interpolateColors(switchTranslate, {
      inputRange: [0, 22],
      outputColorRange: [inActiveTrackColor, activeTrackColor],
    }) as any,
  };

  const memoizedOnSwitchPressCallback = useCallback(() => {
    handleOnPress();
  }, [handleOnPress, value]);

  useEffect(() => {
    if (value) {
      spring(switchTranslate, {
        toValue: 26,
        mass: 1,
        damping: 15,
        stiffness: 120,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
      }).start();
    } else {
      spring(switchTranslate, {
        toValue: 0,
        mass: 1,
        damping: 15,
        stiffness: 120,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
      }).start();
    }
  }, [value, switchTranslate]);

  return (
    <Pressable onPress={memoizedOnSwitchPressCallback}>
      <Animated.View
        style={[
          {
            width: 55,
            paddingVertical: 2,
            paddingHorizontal: 2,
            borderRadius: sizes[9],
          },
          interpolateBackgroundColor,
        ]}
      >
        <Animated.View
          style={[
            {
              width: sizes[6],
              height: sizes[6],
              borderRadius: sizes[6],
            },
            { backgroundColor: thumbColor },
            {
              transform: [
                {
                  translateX: switchTranslate,
                },
              ],
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

export default RNSwitch;
