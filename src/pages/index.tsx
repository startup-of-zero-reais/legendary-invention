import Head from "next/head";
import {
  Header,
  Filter,
  ModalApplyVacancy,
  Search,
  WrapListVacancies,
} from "@/components";
import { Container, Flex, useDisclosure } from "@chakra-ui/react";
import { CONSTANTS } from "@/lib/constants";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Account } from "@/domain";
import { FilterProvider } from "@/components/Filter/context";
import { AuthProvider } from "../context/auth";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import { Filters } from "@/domain/models/filters";
import { makeAuth } from "./api/auth";
import { Nullable } from "@/lib/nullable";
import { filters } from "./api/filters";
import { getJob } from "./api/jobs";
import { useQuery } from "react-query";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

type HomeProps = {
  account: Nullable<Account>;
  canSwap: boolean;
  isAuth: boolean;
  namedFilters: Filters.Embedded;
};

export default function Home({
  account,
  isAuth,
  canSwap,
  namedFilters,
}: Props) {
  let router = useRouter();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const jobId = router.query.vaga as string;

  const jobQuery = useQuery(
    ["@loadjob", jobId],
    async () => await getJob(jobId),
    {
      enabled: !!jobId,
      retry: 0,
    }
  );

  useEffect(() => {
    if (!router.query.vaga) return;
    onOpen();
  }, [onOpen, router.query.vaga]);

  return (
    <AuthProvider {...{ canSwap, isAuth, account, namedFilters }}>
      <Head>
        <title>{CONSTANTS.name_application}</title>
        <meta name="description" content={CONSTANTS.description_application} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Container maxW="container.lg" minHeight="calc(100vh - 68px)">
        <FilterProvider {...{ namedFilters }}>
          <Flex
            minH="100%"
            p={{ base: "2", md: "4", lg: "6" }}
            gap={{ base: 2, md: 4, lg: 6 }}
            flexDirection={{ base: "column", lg: "row" }}
          >
            <Filter />
            <Flex
              flexDirection="column"
              gap={{ base: 2, md: 4, lg: 6 }}
              w="full"
            >
              <Search />
              <WrapListVacancies />
              {!!jobQuery.data && !!router.query.vaga && (
                <ModalApplyVacancy
                  isOpen={isOpen}
                  onClose={onClose}
                  job={jobQuery.data}
                />
              )}
            </Flex>
          </Flex>
        </FilterProvider>
      </Container>
    </AuthProvider>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const auth = makeAuth();
  const [account, namedFilters] = await Promise.all([
    await makeAuth()
      .getSessionFromContext(context)
      .catch(() => null),
    await filters(),
  ]);
  const isAuth = auth.isAuth(account);
  const canSwap = auth.canSwap(account);

  return {
    props: {
      account,
      canSwap,
      isAuth,
      namedFilters,
    },
  };
};
