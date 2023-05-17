import { Header, RenderIf } from "@/components";
import { AuthProvider } from "@/context/auth";
import { LoadAppliedJobs } from "@/domain";
import { CONSTANTS } from "@/lib/constants";
import { getAppliedJobs } from "@/server-lib/api/apply";
import { useDisclosure, Stack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useCallback, Suspense } from "react";

const LazyJobCard = dynamic(() => import("../components/job-card"), {
  ssr: true,
});

const LazyJobDrawer = dynamic(() => import("../components/job-drawer"), {
  ssr: true,
});

interface CandidateAreaProps {
  jobs: LoadAppliedJobs.JobModel[];
}

const CandidateArea = ({ jobs }: CandidateAreaProps) => {
  const {
    query: { vaga },
    back,
  } = useRouter();
  const jobID = vaga?.toString();

  const { onOpen, isOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!jobID) return;
    onOpen();
  }, [onOpen, jobID]);

  const onCloseWrapper = useCallback(() => {
    if (!jobID) onClose(); // close wrapper

    back(); // back url
  }, [back, onClose, jobID]);

  return (
    <AuthProvider>
      <Head>
        <title>{CONSTANTS.name_application}</title>
        <meta name="description" content={CONSTANTS.description_application} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Stack p={6}>
        {jobs.map((job, i) => (
          <Suspense fallback={"Loading"} key={job.id}>
            <LazyJobCard job={job} index={i} />
          </Suspense>
        ))}
      </Stack>

      <RenderIf condition={Boolean(jobID)}>
        <Suspense fallback="Loading...">
          <LazyJobDrawer
            isOpen={isOpen}
            onClose={onCloseWrapper}
            jobID={jobID}
          />
        </Suspense>
      </RenderIf>
    </AuthProvider>
  );
};

export default CandidateArea;

export const getServerSideProps: GetServerSideProps<
  CandidateAreaProps
> = async (context) => {

  const [myJobs] = await Promise.all([
    getAppliedJobs(),
  ]);

  const jobs: LoadAppliedJobs.JobModel[] = [];
  for (const job of myJobs.data) {
    jobs.push(job.job);
  }

  return {
    props: {
      jobs,
    },
  };
};
