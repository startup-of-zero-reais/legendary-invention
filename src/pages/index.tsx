import Head from "next/head";
import {
  Header,
  Filter,
  ModalApplyVacancy,
  Search,
  WrapListVacancies,
  RenderIf,
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
import { AuthFactory } from "@/server-lib/factory/auth";
import { Nullable } from "@/lib/nullable";
import { getFilters } from "@/server-lib/api/filters";
import { getJob } from "@/server-lib/api/jobs";
import { getLocations } from "@/server-lib/api/locations";
import { Location } from "@/domain/models/location";
import { getAppliedJobs } from "@/server-lib/api/apply";
import { request } from "@/server-lib/services";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

type HomeProps = {
  account: Nullable<Account>;
  job: Nullable<JobModel>;
  canSwap: boolean;
  isAuth: boolean;
  filters: Filters.Embedded["_embedded"];
  locations: Location[];
  appliedJobs: string[];
};

export default function Home({
  account,
  isAuth,
  canSwap,
  filters,
  locations,
  job,
  appliedJobs,
}: Props) {
  let {
    query: { vaga },
  } = useRouter();
  const vacancyId = vaga?.toString();

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
        <FilterProvider
          locations={locations}
          filters={filters}
          appliedJobs={appliedJobs}
        >
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

              <RenderIf condition={!!job && !!vacancyId}>
                <ModalApplyVacancy
                  isOpen={isOpen}
                  onClose={onClose}
                  job={job!}
                />
              </RenderIf>
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

  const auth = AuthFactory.make();

  request.defaults.headers.common.Authorization = auth
    .getAuthToken(context)
    .toBearer()

  const [
    account,
    { _embedded: filters },
    job,
    locations,
    appliedJobsResult,
  ] = await Promise.all([
    auth.getSession(),
    getFilters(),
    getJob(vacancyId),
    getLocations(),
    getAppliedJobs(),
  ]);

  const isAuth = auth.isAuth(account);
  const canSwap = auth.canSwap(account);

  const appliedJobs = appliedJobsResult.data.map(data => data.job.id)

  return {
    props: {
      account,
      canSwap,
      isAuth,
      job,
      filters,
      locations,
      appliedJobs,
    },
  };
};
