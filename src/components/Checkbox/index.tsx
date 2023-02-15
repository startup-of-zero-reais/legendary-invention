import {
  chakra,
  Flex,
  useCheckbox,
  Text,
  Box,
  UseCheckboxProps,
} from "@chakra-ui/react";

export default function CustomCheckbox(props: UseCheckboxProps) {
  const { state, getLabelProps, htmlProps, getInputProps, getCheckboxProps } =
    useCheckbox(props);

  return (
    <chakra.label
      display="flex"
      flexDirection="row"
      alignItems="center"
      gridColumnGap={2}
      maxW="40"
      rounded="lg"
      cursor="pointer"
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />
      <Flex
        alignItems="center"
        justifyContent="center"
        border="1px solid"
        borderColor="blackAlpha.500"
        w={4}
        h={4}
        {...getCheckboxProps()}
      >
        {state.isChecked && <Box w={2} h={2} bg="blue.500" />}
      </Flex>
      <Text
        color={"gray.500"}
        fontSize="14px"
        fontWeight="semibold"
        {...getLabelProps()}
      >
        {props.value}
      </Text>
    </chakra.label>
  );
}
