import "@/styles/globals.css";
import { useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

const theme = extendTheme({
  components: {
    Text: {
      baseStyle: {
        fontFamily: "Poppins",
      },
    },
  },
  colors: {
    gray: {
      50: "#F7F5F8",
      300: "#444242",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // prevent refetch on focus window
            staleTime: 1000 * 60 * 60, // 1 hour to consider stale request
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
