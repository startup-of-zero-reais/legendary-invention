import { CardVacancy, Header, RenderIf } from "@/components";
import { AuthProvider } from "@/context/auth";
import { Account, LoadAppliedJobs } from "@/domain";
import { CONSTANTS } from "@/lib/constants";
import { Nullable } from "@/lib/nullable";
import { getAppliedJobs } from "@/server-lib/api/apply";
import { AuthFactory } from "@/server-lib/factory/auth";
import { request } from "@/server-lib/services";
import { Portal, Stack, useDisclosure } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { Suspense, useCallback, useEffect } from "react";

const LazyJobCard = dynamic(
    () => import('./components/job-card'),
    { ssr: true },
)

const LazyJobDrawer = dynamic(
    () => import('./components/job-drawer'),
    { ssr: true },
)

interface MyJobsProps {
    isAuth: boolean;
    canSwap: boolean;
    account: Nullable<Account>;
    jobs: LoadAppliedJobs.JobModel[];
}

const MyJobs = ({
    account,
    isAuth,
    canSwap,
    jobs,
}: MyJobsProps) => {
    const { query: { vaga }, back } = useRouter();
    const jobID = vaga?.toString();

    const { onOpen, isOpen, onClose } = useDisclosure()

    useEffect(() => {
        if(!jobID) return;
        onOpen();
    }, [onOpen, jobID])

    const onCloseWrapper = useCallback(() => {
        if (!jobID)
            onClose(); // close wrapper

        back(); // back url
    }, [back, onClose, jobID])

    return (
        <AuthProvider {...{ canSwap, isAuth, account }}>
            <Head>
                <title>{CONSTANTS.name_application}</title>
                <meta name="description" content={CONSTANTS.description_application} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />

            <Stack p={6}>
                {jobs.map((job, i) => (
                    <Suspense fallback={'Loading'} key={job.id}>
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
    )
}


export default MyJobs;

export const getServerSideProps: GetServerSideProps<MyJobsProps> = async (context) => {
    const auth = AuthFactory.make()

    request.defaults.headers.common.Authorization = auth
        .getAuthToken(context)
        .toBearer()

    const [account, myJobs] = await Promise.all([
        auth.getSession(),
        getAppliedJobs()
    ]);

    const isAuth = auth.isAuth(account);

    if (!isAuth) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    }

    const canSwap = auth.canSwap(account);

    const jobs: LoadAppliedJobs.JobModel[] = [];
    for (const job of myJobs.data) {
        jobs.push(job.job)
    }

    return {
        props: {
            jobs,
            account,
            isAuth,
            canSwap,
        }
    }
}