import { CONSTANTS } from "@/lib/constants";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input as ChakraInput,
  Stack,
  Image,
  Spinner,
  Spacer,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormHelperText,
  VStack,
  useTheme,
  ScaleFade,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { bff } from "@/server-lib/services";
import { useCallback, useRef, useState } from "react";
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { AuthFactory } from "@/server-lib/factory/auth";
import { useRouter } from "next/router";
import { Input, RenderIf } from "@/components";

type FormInputs = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string()
      .email('Forneça um e-mail válido')
      .required('O campo e-mail é obrigatório'),
    password: yup.string()
      .min(6, 'O campo de senha deve conter no mínimo 6 caracteres')
      .required('O campo de senha é obrigatório'),
  })
  .required();

export default function Entrar() {
  const { replace } = useRouter();
  const [error, setError] = useState("");
  const theme = useTheme()

  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormInputs>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const timeout = useRef<NodeJS.Timeout>(null!);
  const setErrorWithTimeout = useCallback((msg: string, seconds = 5) => {
    if (timeout.current) 
      clearTimeout(timeout.current)
    
    setError(msg)
    // clear error
    timeout.current = setTimeout(() => {
      setError('')
      clearTimeout(timeout.current)
    }, seconds * 1000)
  }, [])

  const onSubmit = useCallback(
    async (data: FormInputs) => {
      try {
        const response = await bff.post("/api/auth", data);
        if (response) replace(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          setErrorWithTimeout(error.response?.data.message);
          return
        }

        setErrorWithTimeout('Ocorreu um erro, tente novamente mais tarde')
      }
    },
    [replace, setErrorWithTimeout]
  );

  return (
    <Stack
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
      bg={theme.colors.gray[50]}
    >      
      <Flex
        p={4}
        flex={1}
        align={"center"}
        justify={"center"}
        minW={`min(100%, ${theme.breakpoints.sm})`}
        direction={"column"}
      >        
        <Stack
          spacing={4}
          padding={8}
          w={`min(100%, ${theme.breakpoints.sm})`}
          backgroundColor={`white`}
          rounded={8}
          shadow="md"
        >
          <Heading fontWeight="medium" fontSize={"2xl"}>
            Acesse sua conta {CONSTANTS.name_application}
          </Heading>

          <VStack
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            alignItems="stretch"
            gap={4}
          >
            <Input<FormInputs>
              register={register}
              label="E-mail"
              name="email"
              isInvalid={Boolean(errors.email?.message)}
              errorMessage={errors.email?.message}
            />

            <Input<FormInputs>
              register={register}
              label="Senha"
              name="password"
              type={"password"}
              isInvalid={Boolean(errors.password?.message)}
              errorMessage={errors.password?.message}
            />

            <Stack spacing={6}>
              <Button
                colorScheme={"blue"}
                variant={"solid"}
                type="submit"
                isDisabled={!isValid || isSubmitting}
                leftIcon={
                  <RenderIf condition={isSubmitting}>
                    <Spinner />
                  </RenderIf>
                }
                shadow="md"
              >
                {(isSubmitting) ? 'Entrando...' : 'Entrar'}
              </Button>

              <RenderIf condition={!!error}>
                <ScaleFade in={!!error}>
                  <Alert status="error" rounded={"md"} w="full" mb={2}>
                    <AlertIcon />
                    <AlertTitle>Oops!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </ScaleFade>
              </RenderIf>
            </Stack>
          </VStack>
        </Stack>
      </Flex>

      <Flex flex={1} display={{ base: "none", md: "none", lg: "flex" }}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src="/login.png"
        />
      </Flex>
    </Stack>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const auth = AuthFactory.make();
  const account = await auth.getSessionFromContext(context).catch(() => null);

  if (auth.isAuth(account)) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
};
