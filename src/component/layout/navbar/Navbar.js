import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { productContext } from "../../../context/productContext";

const Navbar = () => {
  const { mainPageProducts } = useContext(productContext);
  return (
    <div>
      {mainPageProducts?.categories?.length > 0 &&
        mainPageProducts.categories.map((category) => {
          return (
            <>
              <Link
                to={`/products/categories/${category.name}?page=1`}
                key={category._id}
              >
                {category.name}
              </Link>
              <br />
            </>
          );
        })}
    </div>
  );
};

export default Navbar;
