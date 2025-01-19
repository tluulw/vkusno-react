import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (item, size, quantity) => {
    setCartItems((prev) => {
      // Проверяем, есть ли уже такой товар в корзине
      const existingItemIndex = prev.findIndex(
        (i) => i.item.id === item.id && i.size.size === size.size
      );

      if (existingItemIndex !== -1) {
        // Если товар уже есть, увеличиваем его количество
        const updatedItems = [...prev];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      }

      // Если товара нет, добавляем его
      return [...prev, { item, size, quantity }];
    });
  };

  const increaseItemQuantity = (el) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (i) => i.item.id === el.item.id && i.size.size === el.size.size
      );
      const updatedItems = [...prev];
      updatedItems[existingItemIndex].quantity += 1;
      return updatedItems;
    });
  };

  const decreaseItemQuantity = (el) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (i) => i.item.id === el.item.id && i.size.size === el.size.size
      );
      const updatedItems = [...prev];
      updatedItems[existingItemIndex].quantity -= 1;
      return updatedItems;
    });
  };

  const removeItemFromCart = (el) => {
    setCartItems((prev) =>
      prev.filter(
        (i) => !(i.item.id === el.item.id && i.size.size === el.size.size)
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearCart,
        increaseItemQuantity,
        decreaseItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
