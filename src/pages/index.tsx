import Head from "next/head";
import { Header, Filter, CardVacancies } from "@/components";
import {
  Box,
  Container,
  Flex,
  IconButton,
  Input,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { CONSTANTS } from "@/constants";
import { Search2Icon } from "@chakra-ui/icons";

export default function Home() {
  return (
    <>
      <Head>
        <title>{CONSTANTS.name_application}</title>
        <meta name="description" content={CONSTANTS.description_application} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Container maxW="container.lg" minHeight="calc(100vh - 68px)">
        <Flex
          minH="100%"
          p={{ base: "2", md: "4", lg: "6" }}
          gap={{ base: 2, md: 4, lg: 6 }}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Box>
            <Filter />
          </Box>
          <Flex flexDirection="column" gap={{ base: 2, md: 4, lg: 6 }} w="full">
            <Box>
              <Flex
                bg="white"
                p={{ base: "2", md: "4", lg: "6" }}
                border="1px"
                borderColor={useColorModeValue("gray.200", "gray.700")}
                borderRadius={{ base: "md", lg: "2xl" }}
              >
                <Input placeholder="Procurar vagas por título, empresa ou qualquer palavra chave..." />
                <IconButton
                  aria-label="Procurador de vagas"
                  icon={<Search2Icon />}
                  ml="2"
                />
              </Flex>
            </Box>
            <VStack
              p={{ base: "2", md: "4", lg: "6" }}
              gap={{ base: 0, md: 2, lg: 4 }}
              bg="white"
              border="1px"
              borderColor={useColorModeValue("gray.200", "gray.700")}
              borderRadius={{ base: "md", lg: "2xl" }}
              alignItems={"stretch"}
            >
              {[0, 1, 2, 3].map((_, key) => (
                <CardVacancies index={key} key={key} />
              ))}
            </VStack>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}
