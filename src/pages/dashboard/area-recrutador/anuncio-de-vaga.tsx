import { Header } from "@/components"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { AuthProvider } from "@/context/auth"
import { CONSTANTS } from "@/lib/constants"
import dynamic from "next/dynamic"

const JobAdComponent = dynamic(
    () => import('@/presentation/pages/dashboard/area-recrutador/anuncio-de-vaga'),
    { ssr: true }
)

interface NewJobAdProps  {
}

const NewJobAd = ({  }: NewJobAdProps) => {
    return (
        <AuthProvider>
            <Head>
                <title>{CONSTANTS.name_application}</title>
                <meta name="description" content={CONSTANTS.description_application} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            
            <JobAdComponent />
        </AuthProvider>
    )
}

export default NewJobAd

export const getServerSideProps: GetServerSideProps<NewJobAdProps> = async (
    context
) => {
    return {
        props: {
        }
    }
}