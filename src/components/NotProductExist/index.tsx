import { Alert, AlertDescription, AlertTitle } from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const NotProductExist = () => {
  return (
    <Alert
      status="info"
      variant="subtle"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
      height="200px"
      mt="5"
    >
      <AiOutlineInfoCircle size="2.0rem" />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Ops!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Não encontramos nenhum produto, tente criar um novo.
      </AlertDescription>
    </Alert>
  );
};

export default NotProductExist;
