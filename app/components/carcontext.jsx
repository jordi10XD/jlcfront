'use client';
import { createContext, useContext, useState, useEffect } from 'react';

// --- CORRECCIÓN AQUÍ ---
// En lugar de 'null', creamos un objeto con las funciones vacías.
// Esto sirve de "molde" para que TypeScript sepa qué existe.
const defaultState = {
  cart: [],
  addToCart: (product) => {},
  removeFromCart: (index) => {},
  cartCount: 0
};

const CartContext = createContext(defaultState);
// -----------------------

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Cargar solo en el cliente
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (error) {
          console.error("Error al cargar carrito:", error);
        }
      }
    }
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const newCart = [...prevCart, product];
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((_, index) => index !== indexToRemove);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const cartCount = cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};