import { ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ProgressBar from 'nextjs-progressbar';
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/lib/theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // prevent refetch on focus window
      staleTime: 1000 * 60 * 60, // 1 hour to consider stale request
    },
  },
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page: any) => page)

  return getLayout(
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ProgressBar />
          <Component {...pageProps} />
        </QueryClientProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}
