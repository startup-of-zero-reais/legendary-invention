import { Header } from "@/components"
import { AuthProvider, AuthProviderProps } from "@/context/auth"
import { CONSTANTS } from "@/lib/constants"
import { AuthFactory } from "@/server-lib/factory/auth"
import { Heading } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import Head from "next/head"

interface MyJobsProps {
    authProps: AuthProviderProps;
}

const RecruiterArea = ({
    authProps,
}: MyJobsProps) => {      
    return (
        <AuthProvider {...authProps}>
            <Head>
                <title>{CONSTANTS.name_application}</title>
                <meta name="description" content={CONSTANTS.description_application} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />

            <Heading>Area do recrutador</Heading>
        </AuthProvider>
    )
}

export default RecruiterArea

export const getServerSideProps: GetServerSideProps<MyJobsProps> = async (
    context
) => {
    const auth = AuthFactory.make();

    const [authProps] = await Promise.all([
        auth.authProps(context),
    ]);

    const { isAuth, navigateAs } = authProps

    if (!isAuth) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    }

    if (navigateAs === 'candidate') {
        return {
                redirect: {
                permanent: false,
                destination: '/dashboard/minhas-vagas'
            }
        }
    }

    return {
        props: {
            authProps,
        },
    };
}