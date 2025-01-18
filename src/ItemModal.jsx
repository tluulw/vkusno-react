import { useState, useEffect } from "react";
import { styled, keyframes } from "styled-components";

// Анимация для появления модального окна
const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Анимация для закрытия модального окна
const slideDown = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.7); /* Фон оверлея */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`;

const Modal = styled.div`
  animation: ${slideUp} 0.4s ease-out; /* Анимация выезда модалки */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end; /* Модалка "внизу экрана" */
  z-index: 1000;
  width: 100%;

  &.closing {
    animation: ${slideDown} 0.4s ease-out;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  background-color: #ffffff;
  height: 70vh;
  position: relative;
  box-sizing: border-box; /* Чтобы padding не увеличивал размеры */
  width: 100%;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalImage = styled.img`
  width: 35vw;
  object-fit: contain;
`;

const ModalTitleContainer = styled.div`
  flex: 1;
  display: flex;
  margin-left: 1rem;
  flex-direction: column;
  justify-content: center;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  transition: color 0.3s;

  &:hover {
    color: #555;
  }
`;

const SizeButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
  justify-content: center;
`;

const SizeButton = styled.button`
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap; /* Текст не переносится */
  transition: color 0.3s;
  &:hover {
    color: #555;
  }
  &:focus {
    outline: none;
  }
  &.active {
    font-weight: bold;
    color: red;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666666;
  margin-bottom: 1rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuantityButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  background-color: #ffffff;
  color: #333333;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f2f2f2;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;

    &:hover {
      background-color: #ffffff;
    }
  }
`;

const QuantityDisplay = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`;

const AddToCartButton = styled.button`
  background-color: #2c365e;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.5rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1b254b;
  }
`;

const ModalBody = styled.div`
  flex: 1; /* Растягиваем на оставшееся пространство */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem 0;
`;

export default function ItemModal({ isOpen, onClose, item }) {
  const [selectedSize, setSelectedSize] = useState(item.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    console.log("Добавлено в корзину:", {
      item,
      size: selectedSize,
      quantity,
    });
    onClose(); // Закрываем модалку после добавления
  };

  // Отключаем скролл при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Чистим эффект при размонтировании компонента
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <ModalOverlay>
      <Modal>
        <ModalContent>
          <ModalHeader>
            <ModalImage src={selectedSize.image} alt={item.title} />
            <ModalTitleContainer>
              <ModalTitle>{item.title}</ModalTitle>
            </ModalTitleContainer>
            <CloseButton onClick={onClose}>&times;</CloseButton>
          </ModalHeader>

          <ModalBody>
            {item.sizes.length > 1 && (
              <SizeButtons>
                {item.sizes.map((size) => (
                  <SizeButton
                    key={size.price}
                    className={selectedSize === size ? "active" : ""}
                    onClick={() => handleSizeChange(size)}
                  >
                    {size.size}
                  </SizeButton>
                ))}
              </SizeButtons>
            )}
            <Description>{item.description}</Description>
          </ModalBody>

          <Footer>
            <QuantityControls>
              <QuantityButton
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity === 1}
              >
                -
              </QuantityButton>
              <QuantityDisplay>{quantity}</QuantityDisplay>
              <QuantityButton onClick={() => handleQuantityChange(1)}>
                +
              </QuantityButton>
            </QuantityControls>
            <AddToCartButton onClick={handleAddToCart}>
              Добавить {selectedSize.price * quantity} руб.
            </AddToCartButton>
          </Footer>
        </ModalContent>
      </Modal>
    </ModalOverlay>
  );
}
