import { useState } from 'react';
import { createContext, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
  
    const addItem = (item) => {
      setItems([...items, item]);
    };
  
    const removeItem = (index) => {
      setItems((prev) => prev.filter((_, i) => i !== index));
    };
  
    const clearCart = () => {
      setItems([]);
    };
  
    const toggleCart = () => setIsOpen(!isOpen);
  
    return (
      <CartContext.Provider
        value={{ items, addItem, removeItem, clearCart, isOpen, toggleCart }}
      >
        {children}
      </CartContext.Provider>
    );
  }
  
  export const useCart = () => useContext(CartContext);