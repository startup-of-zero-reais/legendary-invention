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
import { Account, JobModel } from "@/domain";
import { FilterProvider } from "@/components/Filter/context";
import { AuthProvider } from "../context/auth";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import { Filters } from "@/domain/models/filters";
import { makeAuth } from "./api/auth";
import { Nullable } from "@/lib/nullable";
import { filters } from "./api/filters";
import { getJob } from "./api/jobs";
import { locations } from "./api/locations";
import { Location } from "@/domain/models/location";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

type HomeProps = {
  account: Nullable<Account>;
  job: Nullable<JobModel>;
  canSwap: boolean;
  isAuth: boolean;
  _embedded: Filters.Embedded["_embedded"];
  _embedded_location: Location[];
};

export default function Home({
  account,
  isAuth,
  canSwap,
  _embedded,
  _embedded_location,
  job,
}: Props) {
  let {
    query: { vaga },
  } = useRouter();
  const vacancyId = vaga as string;

  const { onOpen, isOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!vacancyId) return;
    onOpen();
  }, [onOpen, vacancyId]);

  return (
    <AuthProvider {...{ canSwap, isAuth, account }}>
      <Head>
        <title>{CONSTANTS.name_application}</title>
        <meta name="description" content={CONSTANTS.description_application} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Container maxW="container.lg" minHeight="calc(100vh - 68px)">
        <FilterProvider locations={_embedded_location} filters={_embedded}>
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
              {!!job && !!vacancyId && (
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
    </AuthProvider>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const {
    query: { vaga },
  } = context;

  const vacancyId = vaga as string;

  const auth = makeAuth();

  const [account, { _embedded }, job, { _embedded: _embedded_location }] =
    await Promise.all([
      await makeAuth()
        .getSessionFromContext(context)
        .catch(() => null),
      await filters(),
      vacancyId ? await getJob(vacancyId) : null,
      await locations(),
    ]);

  const isAuth = auth.isAuth(account);
  const canSwap = auth.canSwap(account);

  return {
    props: {
      account,
      canSwap,
      isAuth,
      job,
      _embedded,
      _embedded_location,
    },
  };
};
