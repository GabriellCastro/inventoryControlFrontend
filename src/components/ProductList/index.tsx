import { Badge, Box, Button, Image, useToast } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { api } from "../../api/server";
import { ProductContext } from "../../context/ProductContext";

import Loading from "../Loading";
import NotProductExist from "../NotProductExist";

const ProductList = () => {
  const {
    products,
    setProducts,
    loading,
    setLoading,
    search,
    filterSorted,
    setProductEdit,
    onOpenEdit,
  } = useContext(ProductContext);
  const toast = useToast();

  useEffect(() => {
    setLoading(true);
    api
      .get("/list")
      .then(({ data }) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const filteredProducts =
    search.length > 0
      ? products.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase().trim())
        )
      : products;

  const sortedProducts =
    filterSorted === "maior"
      ? filteredProducts.sort((a, b) => b.quantity - a.quantity)
      : filteredProducts.sort((a, b) => a.quantity - b.quantity);

  const deleteProduct = async (id: number) => {
    try {
      setLoading(true);
      await api.delete(`/delete/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      toast({
        title: "Publicação deletada",
        description: "Sua publicação foi deletada com sucesso",
        status: "success",
      });
      setLoading(false);
    } catch (error) {
      toast({
        title: "Erro ao deletar produto!",
        description: "Tente novamente mais tarde!",
        status: "error",
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (products.length === 0) {
    return <NotProductExist />;
  }

  return (
    <>
      {sortedProducts.map((property, index) => (
        <Box
          key={index}
          maxW="md"
          borderWidth="1px"
          borderRadius="lg"
          rounded="lg"
          boxShadow="lg"
          m="auto"
          mt="4"
          p="2"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Image
            src={`http://localhost:3001/${property.image}`}
            alt="Imagem do produto"
          />

          <Box p="4">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="base" px="3" colorScheme="teal">
                {property.quantity}
                {property.quantity > 1 ? " unidades" : " unidade"}
              </Badge>
            </Box>

            <Box
              mt="1"
              fontSize={"xl"}
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {property.name.toLocaleUpperCase()}
            </Box>

            <Box
              as="p"
              color="gray.500"
              fontSize="sm"
              lineHeight="tight"
              mt="1"
              mb="2"
            >
              {property.description}
            </Box>

            <Box>
              R$ {property.price.toFixed(2)}
              <Box as="span" color="gray.600" fontSize="sm">
                / unidade
              </Box>
            </Box>

            <Box mt="4" display="flex" justifyContent="space-between">
              <Button
                variant="solid"
                borderRadius="lg"
                onClick={() => deleteProduct(property.id)}
              >
                <AiOutlineDelete size="1.5rem" />
              </Button>
              <Button
                variant="solid"
                borderRadius="lg"
                onClick={() => {
                  setProductEdit(property);
                  onOpenEdit();
                }}
              >
                <AiOutlineEdit size="1.5rem" />
              </Button>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default ProductList;
