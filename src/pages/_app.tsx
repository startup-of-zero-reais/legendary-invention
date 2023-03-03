import { theme } from "@/lib/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import ProgressBar from 'nextjs-progressbar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // prevent refetch on focus window
      staleTime: 1000 * 60 * 60, // 1 hour to consider stale request
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ProgressBar />
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
