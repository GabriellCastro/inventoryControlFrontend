import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { api } from "../../api/server";
import { ProductContext } from "../../context/ProductContext";

const ModalEdit = () => {
  const { isOpenEdit, onCloseEdit, productEdit } = useContext(ProductContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const toast = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("price", price);
      formData.append("image", image);

      await api.put(`/edit/${productEdit.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Sucesso!",
        description: "Seu produto foi editado com sucesso!",
        status: "success",
      });

      onCloseEdit();

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
      <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar produto</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form encType="multipart/form-data">
              <FormControl>
                <FormLabel>
                  <Image
                    src={`http://localhost:3001/${productEdit.image}`}
                    alt="Imagem do produto"
                  />
                </FormLabel>
                <p>*Apenas aquivos de imagem*</p>
                <Input
                  type="file"
                  onChange={({ target }: any) => setImage(target.files[0])}
                  _hover={{
                    cursor: "pointer",
                  }}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Produto: {productEdit.name}</FormLabel>
                <Input
                  type="text"
                  onChange={({ target }) => setName(target.value)}
                  placeholder="Nome do produto"
                />
                {name?.length > 20 && (
                  <p>Título, o limite é de 20 caracteres.</p>
                )}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel> Descrição: {productEdit.description}</FormLabel>
                <Textarea
                  placeholder="Descrição do produto"
                  onChange={({ target }: any) => setDescription(target.value)}
                />
                {description?.length <= 5 && (
                  <p>Descrição, o minimo é de 5 caracteres.</p>
                )}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>
                  Quantidade: {productEdit.quantity}{" "}
                  {productEdit.quantity > 1 ? "unidades" : "udidade"}
                </FormLabel>
                <Input
                  placeholder="Quantidade"
                  type="number"
                  onChange={({ target }: any) => setQuantity(target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Preço: {productEdit.price}</FormLabel>
                <Input
                  placeholder="Preço"
                  type="number"
                  onChange={({ target }: any) => setPrice(target.value)}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              colorScheme="blue"
              mr={3}
              onClick={(e) => handleSubmit(e)}
            >
              Salvar
            </Button>
            <Button variant="outline" onClick={onCloseEdit}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEdit;
