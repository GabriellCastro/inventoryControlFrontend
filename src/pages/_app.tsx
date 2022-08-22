import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { ProductProvider } from "../context/ProductContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ProductProvider>
        <Component {...pageProps} />
      </ProductProvider>
    </ChakraProvider>
  );
}

export default MyApp;
