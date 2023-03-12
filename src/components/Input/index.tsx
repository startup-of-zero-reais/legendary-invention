import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormHelperText,
  ScaleFade,
  InputGroup,
  InputRightElement,
  IconButton,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from 'react-icons/fi'
import React, { useCallback, useState } from "react";
import { Path, UseFormRegister } from "react-hook-form";
import { RenderIf } from "../helpers/render-if";

type FV = { [k: string]: any };

interface InputProps<FormValues extends FV> extends ChakraInputProps {
  name: Path<FormValues>;
  label: string;
  register: UseFormRegister<FormValues>;
  isCurrency?: boolean;
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
    isCurrency = false,
    helperMessages = [],
    type = 'text',
    ...rest
  } = props;

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = useCallback(() => setIsVisible(!isVisible), [isVisible])

  return (
    <FormControl isInvalid={isInvalid} id={name}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <RenderIf condition={isCurrency}>
          <InputLeftAddon>R$</InputLeftAddon>
        </RenderIf>

        <ChakraInput
          {...rest}
          {...register(name)}
          isInvalid={isInvalid}
          autoComplete="off"
          type={isVisible ? 'text' : type}
          background={"#fefefe"}
          rounded={isCurrency ? 0 : undefined}
          textAlign={isCurrency ? 'right' : 'left'}
        />

        <RenderIf condition={isCurrency}>
          <InputRightAddon>,00</InputRightAddon>
        </RenderIf>

        <RenderIf condition={type === 'password'}>
          <InputRightElement>
            <IconButton
              onClick={toggleVisibility}
              aria-label="visualizar password"
              icon={isVisible
                ? <FiEyeOff />
                : <FiEye />
              }
            />
          </InputRightElement>
        </RenderIf>
      </InputGroup>

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
