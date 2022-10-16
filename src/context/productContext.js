import { createContext, useState } from "react";
import { useAxios } from "../app/hooks/useAxios";
import { instance } from "../app/instance";

export const productContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductUpdating, setIsProductUpdating] = useState(false);
  const { isLoading, data: mainPageProducts, error } = useAxios("/products");

  const saveProduct = async (product) => {
    const path = selectedProduct
      ? `/products/${selectedProduct._id}`
      : "/products";

    const method = selectedProduct ? "put" : "post";

    try {
      const resp = await instance[method](path, { product });
    } catch (error) {}
  };
  return (
    <productContext.Provider
      value={{
        mainPageProducts,
        selectedProduct,
        setSelectedProduct,
        isProductUpdating,
        setIsProductUpdating,
        saveProduct,
      }}
    >
      {children}
    </productContext.Provider>
  );
};
