import Head from "next/head";
import { Header, Filter } from "@/components";
import { Container } from "@chakra-ui/react";
import { CONSTANTS } from "@/constants";

export default function Home() {
  return (
    <>
      <Head>
        <title>{CONSTANTS.name_application}</title>
        <meta name="description" content={CONSTANTS.description_application} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container maxW="7xl" pt="5">
        <Filter />
      </Container>
    </>
  );
}
