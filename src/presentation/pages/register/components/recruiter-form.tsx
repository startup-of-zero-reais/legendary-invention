import { ErrorMessage, Input, RenderIf } from "@/components";
import { useErrorWithTimeout } from "@/lib/set-error-with-timeout";
import { bff } from "@/server-lib/services";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Link,
  ScaleFade,
  Spinner,
  Stack,
  TabPanel,
  Link as ChakraLink,
  Divider,
  Text,
  Checkbox,
  Spacer,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { NextComponentType } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type RecruiterFormInput = {
  name: string;
  email: string;
  password: string;
  phone: string;
  cnpj: string;
  logo: string;
  description: string;
  isNewCompany: boolean;
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
    cnpj: yup.string().required("O campo CNPJ é obrigatório"),
    isNewCompany: yup.boolean(),
    logo: yup.string().when("isNewCompany", {
      is: true,
      then: (schema) => schema.required("O campo Logo é obrigatório"),
      otherwise: (schema) => schema.optional(),
    }),
    description: yup.string().when("isNewCompany", {
      is: true,
      then: (schema) =>
        schema.required("O campo Nome da empresa é obrigatório"),
      otherwise: (schema) => schema.optional(),
    }),
  })
  .required();

const RecruiterForm: NextComponentType = () => {
  const [error, setError] = useState("");
  const [isNewCompany, setIsNewCompany] = useState(false);
  const { replace } = useRouter();
  const setErrorWithTimeout = useErrorWithTimeout(setError);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RecruiterFormInput>({
    defaultValues: { email: "", password: "", name: "", phone: "", cnpj: "" },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async (data: RecruiterFormInput) => {
      try {
        const account = await bff.post("/api/register-recruiter", data);
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
        <Input<RecruiterFormInput>
          register={register}
          label="Nome"
          placeholder={"Digite seu nome"}
          name="name"
          isInvalid={Boolean(errors.name?.message)}
          errorMessage={errors.name?.message}
        />

        <Input<RecruiterFormInput>
          register={register}
          label="E-mail"
          placeholder={"Digite seu e-mail"}
          name="email"
          isInvalid={Boolean(errors.email?.message)}
          errorMessage={errors.email?.message}
        />

        <Input<RecruiterFormInput>
          register={register}
          label="Senha"
          placeholder={"Digite sua senha"}
          name="password"
          type="password"
          isInvalid={Boolean(errors.password?.message)}
          errorMessage={errors.password?.message}
        />
        <Input<RecruiterFormInput>
          register={register}
          label="Telefone"
          placeholder={"Digite seu telefone"}
          name="phone"
          isInvalid={Boolean(errors.phone?.message)}
          errorMessage={errors.phone?.message}
        />
        <Divider />

        <Text size="2xl" fontWeight="medium">
          Dados da empresa
        </Text>

        <Divider />

        <Input<RecruiterFormInput>
          register={register}
          label="CNPJ"
          placeholder={"Digite seu cnpj"}
          name="cnpj"
          isInvalid={Boolean(errors.cnpj?.message)}
          errorMessage={errors.cnpj?.message}
        />

        <Checkbox
          {...register("isNewCompany")}
          onChange={() => setIsNewCompany((old) => !old)}
          isChecked={isNewCompany}
        >
          Nova Empresa
        </Checkbox>

        <RenderIf condition={isNewCompany}>
          <ScaleFade in={isNewCompany}>
            <Input<RecruiterFormInput>
              register={register}
              label="Logo"
              placeholder={"https://example.com/logo.png"}
              name="logo"
              isInvalid={Boolean(errors.logo?.message)}
              errorMessage={errors.logo?.message}
            />

            <Spacer mt={6} />

            <Input<RecruiterFormInput>
              register={register}
              label="Nome da empresa"
              placeholder={"Ex: Google Inc."}
              name="description"
              isInvalid={Boolean(errors.description?.message)}
              errorMessage={errors.description?.message}
            />
          </ScaleFade>
        </RenderIf>

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

          <ErrorMessage error={error} />
        </Stack>
      </Stack>
    </TabPanel>
  );
};

export default RecruiterForm;
