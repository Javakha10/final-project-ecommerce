import { Button } from "@mui/material";
import React, { useContext } from "react";
import { getUser } from "../../app/util";
import { CartContext } from "../../context/cartContext";

export const Cart = () => {
  const { cart, saveUserCart } = useContext(CartContext);
  const user = getUser();
  return (
    <div>
      {cart?.length > 0 ? (
        <>
          {cart.map((cartItem) => {
            return (
              <div key={cartItem.product._id}>
                <h1>{cartItem.product.name}</h1>
                <h1>{cartItem.quantity}</h1>
              </div>
            );
          })}
        </>
      ) : (
        <h1>Cart is Empty</h1>
      )}
      {user && (
        <Button onClick={() => saveUserCart(user._id)}>SAVE CART</Button>
      )}
    </div>
  );
};
