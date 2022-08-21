import { Container } from "@chakra-ui/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Container
        maxW="1400px"
        px="6"
        display="flex"
        flexDirection="column"
        minH="100vh"
      >
        <h1>Hello World</h1>
      </Container>
    </>
  );
};

export default Home;
