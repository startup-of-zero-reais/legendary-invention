import { Input, RenderIf } from "@/components";
import { useErrorWithTimeout } from "@/lib/set-error-with-timeout";
import { bff } from "@/server-lib/services";
import {
  TabPanel,
  Stack,
  Button,
  Spinner,
  ScaleFade,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { NextComponentType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type CandidateFormInput = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

const schema = yup
  .object({
    email: yup
      .string()
      .email("Forneça um e-mail válido")
      .required("O campo e-mail é obrigatório"),
    password: yup
      .string()
      .min(6, "O campo de senha deve conter no mínimo 6 caracteres")
      .required("O campo de senha é obrigatório"),
    name: yup.string().required("O campo nome é obrigatório"),
    phone: yup.string().required("O campo telefone é obrigatório"),
  })
  .required();

const CandidateForm: NextComponentType = () => {
  const [error, setError] = useState("");
  const { replace } = useRouter();
  const setErrorWithTimeout = useErrorWithTimeout(setError);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CandidateFormInput>({
    defaultValues: { email: "", password: "", name: "", phone: "" },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async (data: CandidateFormInput) => {
      try {
        const account = await bff.post("/api/register-candidate", data);
        console.log(account);
        if (account) replace("/entrar");
      } catch (error) {
        if (error instanceof AxiosError) {
          setErrorWithTimeout(error.response?.data.message);
          return;
        }
        setErrorWithTimeout("Ocorreu um erro, tente novamente mais tarde");
      }
    },
    [replace, setErrorWithTimeout]
  );

  return (
    <TabPanel>
      <Stack gap={3} as={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Input<CandidateFormInput>
          register={register}
          label="Nome"
          placeholder={"Digite seu nome"}
          name="name"
          isInvalid={Boolean(errors.name?.message)}
          errorMessage={errors.name?.message}
        />

        <Input<CandidateFormInput>
          register={register}
          label="E-mail"
          placeholder={"Digite seu e-mail"}
          name="email"
          isInvalid={Boolean(errors.email?.message)}
          errorMessage={errors.email?.message}
        />

        <Input<CandidateFormInput>
          register={register}
          label="Senha"
          placeholder={"Digite sua senha"}
          name="password"
          type="password"
          isInvalid={Boolean(errors.password?.message)}
          errorMessage={errors.password?.message}
        />
        <Input<CandidateFormInput>
          register={register}
          label="Telefone"
          placeholder={"Digite seu telefone"}
          name="phone"
          isInvalid={Boolean(errors.phone?.message)}
          errorMessage={errors.phone?.message}
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
            {isSubmitting ? "Registrando..." : "Registrar"}
          </Button>

          <ChakraLink as={Link} href="/entrar">
            Já possui uma conta? Acesse
          </ChakraLink>

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
      </Stack>
    </TabPanel>
  );
};

export default CandidateForm;
