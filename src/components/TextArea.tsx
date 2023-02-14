import {
  TextArea as NativeBaseTextArea,
  ITextAreaProps,
  FormControl,
} from "native-base";

type Props = ITextAreaProps & {
  isShowPassword?: boolean;
  errorMessage?: string | null;
  InputRightComponent?: JSX.Element;
};

export function TextArea({
  isShowPassword = true,
  errorMessage = null,
  isInvalid,
  type = "text",
  InputRightComponent = <></>,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl>
      <NativeBaseTextArea
        bg="gray.700"
        borderWidth={0}
        color="gray.200"
        fontSize="md"
        fontFamily={"body"}
        px={4}
        h={40}
        placeholderTextColor="gray.400"
        borderRadius={6}
        _focus={{
          bgColor: "gray.700",
          borderWidth: 1,
          borderColor: "gray.300",
        }}
        placeholder="Descrição do produto"
        autoCompleteType={undefined}
        {...rest}
      />
    </FormControl>
  );
}
