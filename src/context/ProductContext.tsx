import { useDisclosure } from "@chakra-ui/react";
import { createContext, FC, ReactNode, useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  image: string;
}

interface IProductContext {
  products: Product[];
  setProducts: (products: any) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  search: string;
  setSearch: (search: string) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  filterSorted: string;
  setFilterSorted: (filterSorted: string) => void;
  isOpenEdit: boolean;
  onOpenEdit: () => void;
  onCloseEdit: () => void;
  productEdit: Product;
  setProductEdit: (productEdit: Product) => void;
}

interface IProductProvider {
  children: ReactNode;
}

export const ProductContext = createContext({} as IProductContext);

export const ProductProvider: FC<IProductProvider> = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterSorted, setFilterSorted] = useState("");
  const [productEdit, setProductEdit] = useState({} as Product);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        loading,
        setLoading,
        search,
        setSearch,
        isOpen,
        onOpen,
        onClose,
        filterSorted,
        setFilterSorted,
        isOpenEdit,
        onOpenEdit,
        onCloseEdit,
        productEdit,
        setProductEdit,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
