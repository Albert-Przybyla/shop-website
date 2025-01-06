import { AddToCartModel } from "@/schemas/AddToCartSchema";
import Cookies from "js-cookie";

const COOKIE_NAME = "cart";

const getCart = (): AddToCartModel[] => {
  const cart = Cookies.get(COOKIE_NAME);
  return cart ? JSON.parse(cart) : [];
};

const saveCart = (cart: AddToCartModel[]) => {
  Cookies.set(COOKIE_NAME, JSON.stringify(cart), { expires: 7 });
};

const addItem = (item: AddToCartModel) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(
    (cartItem) => cartItem.product_id === item.product_id && cartItem.size_id === item.size_id
  );

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCart(cart);
};

const removeItem = (product_id: string, size_id: string) => {
  const cart = getCart().filter((cartItem) => !(cartItem.product_id === product_id && cartItem.size_id === size_id));

  saveCart(cart);
};

const updateItemQuantity = (product_id: string, size_id: string, quantity: number) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(
    (cartItem) => cartItem.product_id === product_id && cartItem.size_id === size_id
  );

  if (existingItemIndex !== -1) {
    if (quantity <= 0) {
      // Usuń produkt, jeśli ilość <= 0
      cart.splice(existingItemIndex, 1);
    } else {
      cart[existingItemIndex].quantity = quantity;
    }
    saveCart(cart);
  }
};

const clearCart = () => {
  Cookies.remove(COOKIE_NAME);
};

export const CartService = {
  getCart,
  addItem,
  removeItem,
  updateItemQuantity,
  clearCart,
};
