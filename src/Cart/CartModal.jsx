import React from "react";
import { styled, keyframes } from "styled-components";
import { useCart } from "./CartContext";
import BackIcon from "./BackIcon";

// Анимация при открытии модалки
const fadeSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Анимация при закрытии модалки
const fadeSlideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const CartModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: ${fadeSlideIn} 0.3s ease-out;

  &.closing {
    animation: ${fadeSlideOut} 0.3s ease-out;
  }
`;

const CartHeader = styled.div`
  background-color: #2c365e;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background: none;
    border: none;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const CartTitle = styled.span`
  flex: 1;
  margin: 0.5rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

const CartBody = styled.div`
  flex: 1;
  background-color: #fff;
  padding-top: 1rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none; /* Скрывает скроллбар в WebKit-браузерах (Chrome, Safari) */
  }
`;

const CartFooter = styled.div`
  background-color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e0e0e0;
`;

const CartItem = styled.div`
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem 0;
`;

const CartItemImage = styled.img`
  width: 30vw;
  object-fit: contain;
  padding-left: 1rem;
`;

const CartItemBody = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  justify-content: space-between;

  p {
    flex: 1;
    margin: 0;
    color: #666666;
  }
`;

const CartItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    background: none;
    border: 1px solid #ccc;
    width: 2rem;
    height: 2rem;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  p {
    margin-left: 2rem;
    font-weight: bold;
    color: #000;
    font-size: 1.2rem;
  }
`;

const TotalPrice = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const CheckoutButton = styled.button`
  background-color: #2c365e;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #1b254b;
  }
`;

export default function CartModal({ onClose, onCheckout }) {
  const {
    cartItems,
    clearCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItemFromCart,
  } = useCart();
  const calculateTotal = () =>
    cartItems.reduce(
      (total, item) => total + item.size.price * item.quantity,
      0
    );

  const onCartClose = () => {
    document.getElementById("cart").classList.add("closing");
    setTimeout(onClose, 250);
  };

  return (
    <CartModalWrapper id="cart">
      {/* Header */}
      <CartHeader>
        <button onClick={onCartClose}>
          <BackIcon />
        </button>
        <CartTitle>Корзина</CartTitle>
        <button
          onClick={() => {
            clearCart();
            onCartClose();
          }}
        >
          Очистить
        </button>
      </CartHeader>

      {/* Body */}
      <CartBody>
        {cartItems.length > 0
          ? cartItems.map((el) => (
              <CartItem key={el.item.id + el.size.size}>
                <CartItemImage src={el.size.image} alt={el.item.title} />
                <CartItemBody>
                  <span>{el.item.title}</span>
                  <p>{el.size.size}</p>
                  <CartItemControls>
                    <button
                      onClick={() => {
                        el.quantity > 1
                          ? decreaseItemQuantity(el)
                          : removeItemFromCart(el);
                      }}
                    >
                      -
                    </button>
                    <span>{el.quantity}</span>
                    <button onClick={() => increaseItemQuantity(el)}>+</button>
                    <p>{el.size.price * el.quantity} руб.</p>
                  </CartItemControls>
                </CartItemBody>
              </CartItem>
            ))
          : onCartClose()}
      </CartBody>

      {/* Footer */}
      <CartFooter>
        <TotalPrice>Итого: {calculateTotal()} руб.</TotalPrice>
        <CheckoutButton onClick={() => onCheckout(calculateTotal(), cartItems)}>
          Оформить заказ
        </CheckoutButton>
      </CartFooter>
    </CartModalWrapper>
  );
}
