import { CONSTANTS } from "@/constants";
import { useAuthentication } from "@/domain";
import { LoginSchema } from "@/domain/validation";
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
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";

type Input = {
  email: string;
  password: string;
};

export default function Entrar() {
  const router = useRouter();
  const { mutate, isLoading, error, isError } = useAuthentication({
    onSuccess: () => {
      router.push("/");
    },
  });

  const onSubmit = (input: Input) => {
    mutate(input);
  };

  const hasError = (error?: string, touched?: boolean) => !!error && !!touched;

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontWeight="bold" fontSize={"2xl"}>
            Acesse sua conta {CONSTANTS.name_application}
          </Heading>
          <Formik
            validationSchema={LoginSchema}
            initialValues={{ email: "", password: "" }}
            onSubmit={onSubmit}
          >
            {({
              values,
              handleSubmit,
              handleChange,
              handleBlur,
              errors,
              touched,
            }) => (
              <Form onSubmit={handleSubmit}>
                <FormControl isInvalid={isError} id="email">
                  <FormLabel>Email</FormLabel>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="email"
                    isInvalid={isError}
                    value={values.email}
                  />
                  {isError ? (
                    <FormErrorMessage color="red" mb={4}>
                      {error.message}
                    </FormErrorMessage>
                  ) : (
                    hasError(errors.email, touched.email) && (
                      <FormErrorMessage color="red" mb={4}>
                        {errors.email}
                      </FormErrorMessage>
                    )
                  )}
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Senha</FormLabel>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                    isInvalid={isError}
                    type="password"
                    value={values.password}
                  />
                  {hasError(errors.password, touched.password) && (
                    <FormErrorMessage color="red" mb={4}>
                      {errors.password}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <Stack spacing={6}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Lembrar-me</Checkbox>
                  </Stack>

                  <Button colorScheme={"blue"} variant={"solid"} type="submit">
                    {isLoading ? <Spinner /> : "Login"}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
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
