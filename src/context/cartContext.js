import { createContext, useEffect, useReducer } from "react";
import { instance } from "../app/instance";
import { getUser } from "../app/util";

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      const productId = newItem?._id;
      const item = state.cart.find(
        (cartItem) => cartItem.product?._id === productId
      );
      let newCart;
      if (item) {
        newCart = state.cart.map((cartItem) =>
          cartItem.product._id === productId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        newCart = [...state.cart, { product: { ...newItem }, quantity: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    case REMOVE_FROM_CART:
      const selectProductId = action.payload;
      const foundItem = state.cart.find(
        (cartItem) => cartItem.product._id === selectProductId
      );
      let updatedCart;
      if (foundItem.quantity === 1) {
        updatedCart = state.cart.filter(
          (cartItem) => cartItem.product._id !== selectProductId
        );
      } else {
        updatedCart = state.cart.map((cartItem) =>
          cartItem.product._id === selectProductId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };
    case POPULATE_CART:
      localStorage.setItem("cart", JSON.stringify(action.payload));
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { cart: [] });
  let firstid = null;
  const addToCart = (product) => {
    dispatch({ type: ADD_TO_CART, payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  };

  const saveUserCart = async (userId) => {
    try {
      await instance.put(`/users/${userId}/cart`, { products: cartState.cart });
    } catch (error) {}
    firstid = userId;
  };

  useEffect(() => {
    const user = getUser();
    if (user) {
      const getUserCart = async () => {
        const { data } = await instance.get(`/users/${user._id}/cart`);
        dispatch({ type: POPULATE_CART, payload: data.cart });
      };
      getUserCart();
    } else {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      dispatch({ type: POPULATE_CART, payload: cart });
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart: cartState.cart,
        addToCart,
        removeFromCart,
        saveUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const POPULATE_CART = "POPULATE_CART";
