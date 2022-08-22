import { Container } from "@chakra-ui/react";
import type { NextPage } from "next";
import Header from "../components/Header";
import ModalCreate from "../components/ModalCreate";
import ModalEdit from "../components/ModalEdit";
import ProductList from "../components/ProductList";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Container
        maxW="1400px"
        px="6"
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
      >
        <ModalCreate />
        <ModalEdit />
        <ProductList />
      </Container>
    </>
  );
};

export default Home;
