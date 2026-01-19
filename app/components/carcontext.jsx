'use client';
import { createContext, useContext, useState, useEffect } from 'react';

// 1. ACTUALIZAMOS EL "MOLDE" (defaultState)
const defaultState = {
  cart: [],
  addToCart: (product) => {},
  removeFromCart: (index) => {},
  cartCount: 0,
  clearCart: () => {}, // Ya estaba, bien.
  total: 0,            // <--- FALTABA ESTO (para que sepa que existe un total)
};

const CartContext = createContext(defaultState);

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
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

  // 2. CREAMOS LA FUNCIÓN PARA VACIAR EL CARRITO
  const clearCart = () => {
    setCart([]); // Vaciamos el estado
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart'); // Vaciamos la memoria del navegador
    }
  };

  // 3. CALCULAMOS EL TOTAL
  // Asumimos que tus productos tienen una propiedad 'price'.
  // Si tus productos tienen 'quantity', la fórmula sería: item.price * item.quantity
  const total = cart.reduce((acc, item) => {
    return acc + (Number(item.price) || 0); 
  }, 0);

  const cartCount = cart.length;

  return (
    // 4. PASAMOS LAS NUEVAS FUNCIONES AL PROVIDER
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        cartCount, 
        clearCart, // <--- AHORA SÍ SE ENVÍA
        total      // <--- AHORA SÍ SE ENVÍA
      }}
    >
      {children}
    </CartContext.Provider>
  );
};