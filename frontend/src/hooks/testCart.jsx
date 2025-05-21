import { useContext } from "react";
//import { CartContext } from "./CreatCart";
import { CartContext } from "./CreatCart";

function useCart() {
  return useContext(CartContext);
}

export { useCart };
