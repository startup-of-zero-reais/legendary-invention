import Head from "next/head";
import { Header, Filter, ModalApplyVacancy, Search } from "@/components";
import { Box, Container, Flex, useDisclosure } from "@chakra-ui/react";
import { CONSTANTS } from "@/constants";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLoadJob } from "@/domain";
import WrapListVacancies from "@/components/WrapListVacancies";
import { FilterProvider } from "@/components/Filter/context";

export default function Home() {
  let router = useRouter();
  const { onOpen, isOpen, onClose } = useDisclosure();

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
        <FilterProvider>
          <Flex
            minH="100%"
            p={{ base: "2", md: "4", lg: "6" }}
            gap={{ base: 2, md: 4, lg: 6 }}
            flexDirection={{ base: "column", lg: "row" }}
          >
            <Box>
              <Filter />
            </Box>
            <Flex
              flexDirection="column"
              gap={{ base: 2, md: 4, lg: 6 }}
              w="full"
            >
              <Search />
              <WrapListVacancies />
              {!!job && !!router.query.vaga && (
                <ModalApplyVacancy
                  isOpen={isOpen}
                  onClose={onClose}
                  job={job}
                />
              )}
            </Flex>
          </Flex>
        </FilterProvider>
      </Container>
    </>
  );
}
