import Head from "next/head";
import { Header, Filter, ModalApplyVacancy, Search } from "@/components";
import { Container, Flex, useDisclosure } from "@chakra-ui/react";
import { CONSTANTS } from "@/constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLoadJob, useLoadAllJob } from "@/domain";
import WrapListVacancies from "@/components/WrapListVacancies";

export default function Home() {
  let router = useRouter();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");

  const {
    data: listJob,
    isLoading: isLoadingListJob,
    refetch: refetchListJob,
  } = useLoadAllJob({
    search,
  });

  const { data: job } = useLoadJob({
    id: router.query.vaga as string,
  });

  useEffect(() => {
    if (!router.query.vaga) return;
    onOpen();
  }, [onOpen, router.query.vaga]);

  useEffect(() => {
    refetchListJob();
  }, [refetchListJob, search]);

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
          <Filter />
          <Flex flexDirection="column" gap={{ base: 2, md: 4, lg: 6 }} w="full">
            <Search onSearch={(value) => setSearch(value)} />
            <WrapListVacancies jobs={listJob} isLoading={isLoadingListJob} />
            {!!job && !!router.query.vaga && (
              <ModalApplyVacancy isOpen={isOpen} onClose={onClose} job={job} />
            )}
          </Flex>
        </Flex>
      </Container>
    </>
  );
}
