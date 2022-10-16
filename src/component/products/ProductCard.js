import { Button, Card, CardContent, Rating } from "@mui/material";
import React, { useContext, useMemo, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { instance } from "../../app/instance";
import { getUser, isUserAdmin } from "../../app/util";
import { CartContext } from "../../context/cartContext";
import { productContext } from "../../context/productContext";
import { userContext } from "../../context/UserContext";

const ProductCard = ({ product, home = false }) => {
  const location = useLocation();
  const [productRating, setProductRating] = useState(product.avarageRating);
  const { addToCart, removeFromCart, cart } = useContext(CartContext);
  const { setSelectedProduct, setIsProductUpdating } =
    useContext(productContext);
  const { userData } = useContext(userContext);
  const navigate = useNavigate();
  const isProductInCart = useMemo(
    () => cart?.find((cartItem) => cartItem.product._id === product._id),
    [cart]
  );

  const onRatingChange = async (e) => {
    e.preventDefault();
    // setProductRating();
    try {
      await instance.post(
        `/products/${product._id}/users/${userData._id}/rate`,
        { rating: +e.target.value }
      );
    } catch (error) {}
  };

  const editProduct = (e, product) => {
    e.preventDefault();
    setSelectedProduct(product);

    setIsProductUpdating(true);
    navigate(`/products/edit/${product.name}`);
  };
  return (
    <Card>
      <CardContent>
        {product.image && <img src={product.image} width="100" height="100" />}
        <Link
          to={
            home
              ? `products/categories/${product.category}/${product.name}`
              : `${location.pathname}/${product.name}`
          }
          state={{ id: product._id, category: product.category }}
        >
          <h1>{product.name}</h1>
        </Link>
        <Rating
          // disable={!getUser()}
          value={productRating}
          precision={0.5}
          onChange={onRatingChange}
        />
        <h2>{product.price}$</h2>
        {isProductInCart ? (
          <>
            <Button onClick={() => removeFromCart(product._id)}>-</Button>
            <span>{isProductInCart.quantity}</span>
            <Button onClick={() => addToCart(product)}>+</Button>
          </>
        ) : (
          <Button onClick={() => addToCart(product)}>add to cart</Button>
        )}
        {isUserAdmin() && (
          <Button
            onClick={(e) => {
              editProduct(e, product);
            }}
          >
            EDIT
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
