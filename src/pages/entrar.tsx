import { CONSTANTS } from "@/lib/constants";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { bff } from "@/server-lib/services";
import { useState } from "react";

type Input = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

export default function Entrar() {
  const [error, setError] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<Input>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: Input) => {
    const response = await bff
      .post("/api/auth", data)
      .catch((error) => setError(error.response.data.message));

    if (response) window.location = response?.data;
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontWeight="bold" fontSize={"2xl"}>
            Acesse sua conta {CONSTANTS.name_application}
          </Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.email?.message} id="email">
              <FormLabel>Email</FormLabel>
              <Input
                {...register("email", { required: true })}
                isInvalid={!!errors.email?.message}
              />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input
                {...register("password", { required: true })}
                isInvalid={!!errors.password?.message}
                type="password"
              />
            </FormControl>

            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Lembrar-me</Checkbox>
              </Stack>

              <Button
                colorScheme={"blue"}
                variant={"solid"}
                type="submit"
                isDisabled={!isValid}
              >
                Login
              </Button>

              {!!error && <span>{error}</span>}
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Flex flex={1} display={{ base: "none", md: "none", lg: "flex" }}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
