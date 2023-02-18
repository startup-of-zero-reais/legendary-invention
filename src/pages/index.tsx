import Head from "next/head";
import { Header, Filter, CardVacancy, ModalApplyVacancy } from "@/components";
import {
  Box,
  Container,
  Flex,
  IconButton,
  Input,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { CONSTANTS } from "@/constants";
import { Search2Icon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import { useLoadJob, useLoadAllJob } from "@/domain";

export default function Home() {
  let router = useRouter();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const { data: listJob, isLoading: isLoadingListJob } = useLoadAllJob({
    search: "Professor",
  });

  const { data: job } = useLoadJob({
    id: router.query.vaga as string,
  });

  useEffect(() => {
    if (!router.query.vaga) return;
    onOpen();
  }, [onOpen, router.query.vaga]);

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
              {listJob?.map((job, key) => (
                <CardVacancy
                  index={key}
                  key={key}
                  job={job}
                  isLoading={isLoadingListJob}
                />
              ))}

              {!!job && !!router.query.vaga && (
                <ModalApplyVacancy
                  isOpen={isOpen}
                  onClose={onClose}
                  job={job}
                />
              )}
            </VStack>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}
