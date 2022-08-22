import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { api } from "../../api/server";
import { ProductContext } from "../../context/ProductContext";

const ModalCreate = () => {
  const { isOpen, onClose } = useContext(ProductContext);
  const toast = useToast();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("price", price);
      formData.append("image", image);

      await api.post("/create", formData);

      toast({
        title: "Sucesso!",
        description: "Seu produto foi criado com sucesso",
        status: "success",
      });
      onClose();

      window.location.reload();
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Tente novamente mais tarde!",
        status: "error",
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar um Produto</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form encType="multipart/formdata">
              <FormControl>
                <FormLabel>Nome do produto</FormLabel>
                <Input
                  placeholder="Nome do produto"
                  onChange={(e: any) => setName(e.target.value)}
                />
                {name.length > 20 && (
                  <Text>Título muito longo, o limite é de 20 caracteres.</Text>
                )}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Descrição</FormLabel>
                <Textarea
                  placeholder="Descrição"
                  onChange={(e: any) => setDescription(e.target.value)}
                />
                {description.length < 5 && (
                  <Text>
                    Descrição muito curta, o minimo é de 5 caracteres.
                  </Text>
                )}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Quantidade</FormLabel>
                <Input
                  placeholder="Quantidade"
                  type="number"
                  onChange={(e: any) => setQuantity(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Preço</FormLabel>
                <Input
                  placeholder="Preço"
                  type="number"
                  onChange={(e: any) => setPrice(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Imagem</FormLabel>
                <Input
                  placeholder="Imagem"
                  type="file"
                  onChange={(e: any) => {
                    setImage(e.target.files[0]);
                  }}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={(e: any) => handleSubmit(e)}
            >
              Criar Produto
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCreate;
