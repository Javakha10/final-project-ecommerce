import React, { useContext } from "react";
import { productContext } from "../../context/productContext";
import ProductCard from "./ProductCard";

const HomeComponent = () => {
  const { mainPageProducts } = useContext(productContext);

  return (
    <div>
      {mainPageProducts?.products?.length > 0 &&
        mainPageProducts.products.map((product) => {
          return (
            <ProductCard key={product._id} product={product} home={true} />
          );
        })}
    </div>
  );
};

export default HomeComponent;
