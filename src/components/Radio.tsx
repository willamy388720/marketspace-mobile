import {
  Icon,
  Radio as NativeBaseRadio,
  IRadioProps,
  useTheme,
} from "native-base";
import { Circle } from "phosphor-react-native";

type Props = IRadioProps & {
  label: string;
  value: string;
};

export function Radio({ label, value, ...rest }: Props) {
  const { colors, sizes } = useTheme();

  return (
    <NativeBaseRadio
      value={value}
      _checked={{
        borderColor: "blue.100",
        p: "px",
      }}
      _text={{ color: "gray.200", fontSize: "lg" }}
      icon={
        <Icon
          as={
            <Circle color={colors.blue[100]} weight={"fill"} size={sizes[5]} />
          }
        />
      }
      {...rest}
    >
      {label}
    </NativeBaseRadio>
  );
}
