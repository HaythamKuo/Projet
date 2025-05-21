import { createContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = { isOpen, setIsOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export { CartProvider, CartContext };
