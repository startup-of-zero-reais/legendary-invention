import { Header } from "@/components"
import { AuthProvider } from "@/context/auth"
import { CONSTANTS } from "@/lib/constants"
import { GetServerSideProps } from "next"
import dynamic from "next/dynamic"
import Head from "next/head"
import { Suspense } from "react"

const LazyRecruiterArea = dynamic(
    () => import('@/presentation/pages/dashboard/area-recrutador'),
    { ssr: true }
)

interface MyJobsProps {
}

const RecruiterArea = ({
}: MyJobsProps) => {      
    return (
        <AuthProvider>
            <Head>
                <title>{CONSTANTS.name_application}</title>
                <meta name="description" content={CONSTANTS.description_application} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />

            <Suspense>
                <LazyRecruiterArea />
            </Suspense>
        </AuthProvider>
    )
}

export default RecruiterArea

export const getServerSideProps: GetServerSideProps<MyJobsProps> = async (
    context
) => {
    return {
        props: {
        },
    };
}