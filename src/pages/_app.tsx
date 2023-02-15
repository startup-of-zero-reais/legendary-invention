import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";

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
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
