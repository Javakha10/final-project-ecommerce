import React from "react";
import { useLocation } from "react-router-dom";
import { useAxios } from "../../app/hooks/useAxios";

const SingleProduct = () => {
  const location = useLocation();
  const { id, category } = location.state;
  const { data } = useAxios(`/products/category/${category}/${id}`);

  return (
    <div>
      {data && (
        <div>
          <h1>{data?.product.name}</h1>
          <h1>{data?.product.brand}</h1>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
