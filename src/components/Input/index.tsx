import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormHelperText,
  ScaleFade,
} from "@chakra-ui/react";
import { Path, UseFormRegister } from "react-hook-form";

type FV = { [k: string]: any };

interface InputProps<FormValues extends FV> extends ChakraInputProps {
  name: Path<FormValues>;
  label: string;
  register: UseFormRegister<FormValues>;
  isInvalid?: boolean;
  errorMessage?: string;
  helperMessages?: string[];
}

function Input<FormValues extends FV>(props: InputProps<FormValues>) {
  const {
    label,
    name,
    isInvalid = false,
    errorMessage = "",
    register,
    helperMessages = [],
    ...rest
  } = props;

  return (
    <FormControl isInvalid={isInvalid} id={name}>
      <FormLabel>{label}</FormLabel>
      <ChakraInput
        {...rest}
        {...register(name)}
        isInvalid={isInvalid}
        autoComplete="off"
        background={"#fefefe"}
      />

      <ScaleFade in={isInvalid}>
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </ScaleFade>

      {helperMessages.map((msg, key) => (
        <FormHelperText key={key}>{msg}</FormHelperText>
      ))}
    </FormControl>
  );
}

export default Input;
