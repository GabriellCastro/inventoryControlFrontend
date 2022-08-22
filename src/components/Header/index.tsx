import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  useColorMode,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AiOutlineFilter, AiOutlinePlus } from "react-icons/ai";
import { ProductContext } from "../../context/ProductContext";
const Header = () => {
  const { onOpen, setSearch, setFilterSorted } = useContext(ProductContext);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box as="header" shadow="md" py={4} px="6">
      <Box maxW="1400px" mx="auto">
        <Flex
          alignItems="center"
          justify="space-between"
          fontSize="2xl"
          fontWeight="semibold"
          gap={4}
        >
          .CON
          <Input
            maxW="800px"
            placeholder="Buscar uma publicação"
            borderRadius="lg"
            borderWidth="2px"
            _placeholder={{
              color: "gray.500",
            }}
            onChange={(e: any) => setSearch(e.target.value)}
          />
          <AiOutlineFilter color="gray.500" size="1.5rem" />
          <Select
            onChange={({ target }) => setFilterSorted(target.value)}
            maxW="25vh"
          >
            <option value="menor">Menor Quantidade</option>
            <option value="maior">Maior Quantidade</option>
          </Select>
          <Button
            borderColor="gray.200"
            _hover={{
              bg: "green.500",
              color: "gray.800",
            }}
            borderRadius="lg"
            onClick={onOpen}
          >
            <AiOutlinePlus />
          </Button>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? "Dark" : "Light"}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
