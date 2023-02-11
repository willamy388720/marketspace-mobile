import { useState } from "react";
import { Text, useTheme } from "native-base";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  { label: "Todos", value: "Todos" },
  { label: "Ativos", value: "Ativos" },
  { label: "Inativos", value: "Inativos" },
];

export function Select() {
  const [value, setValue] = useState("Todos");
  const [isFocus, setIsFocus] = useState(false);

  const { colors, sizes, fonts } = useTheme();

  return (
    <Dropdown
      style={[
        {
          height: 34,
          width: 111,
          borderWidth: 1,
          borderRadius: 6,
          paddingHorizontal: 12,
          borderColor: colors.gray[500],
        },
        isFocus && { borderColor: colors.gray[300] },
      ]}
      data={data}
      maxHeight={200}
      labelField="label"
      selectedTextStyle={{
        color: colors.gray[100],
        fontFamily: fonts.body,
        fontSize: sizes[4],
      }}
      valueField="value"
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setValue(item.value);
        setIsFocus(false);
      }}
      containerStyle={{ marginTop: -20, borderRadius: 6 }}
      activeColor={colors.gray[500]}
      iconColor={colors.gray[300]}
      renderItem={(item) => (
        <Text color="gray.100" fontSize="md" px={3} py={1}>
          {item.label}
        </Text>
      )}
    />
  );
}
