import { styled } from "styled-components";
import CategoryButton from "./CategoryButton";
import { useRef, useState } from "react";

const PanelContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  overflow-x: auto; /* Пролистывание по горизонтали */
  white-space: nowrap; /* Запрещаем перенос элементов */
  cursor: grab; /* Указываем, что элемент можно перетаскивать */

  &:active {
    cursor: grabbing; /* Смена курсора во время перетаскивания */
  }

  /* Скрытие скроллбара */
  scrollbar-width: none; /* Скрывает скроллбар в Firefox */
  -ms-overflow-style: none; /* Скрывает скроллбар в Internet Explorer и Edge */

  &::-webkit-scrollbar {
    display: none; /* Скрывает скроллбар в WebKit-браузерах (Chrome, Safari) */
  }
`;

export default function CategoriesPanel() {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    console.log(category);
  };

  const categories = [
    "Новинки",
    "Популярное",
    "Напитки",
    "Бургеры",
    "Снеки",
    "Кафе",
    "Дессерты",
    "Разное",
  ];

  const panelRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  function handleMouseDown(event) {
    setIsDragging(true);
    setStartX(event.pageX);
    event.preventDefault();
  }

  function handleMouseMove(event) {
    if (isDragging) {
      const changex = (event.pageX - startX) / 10;
      panelRef.current.scrollLeft = panelRef.current.scrollLeft - changex;
    }
  }

  function handleMouseUpOrLeave() {
    setIsDragging(false);
  }

  return (
    <PanelContainer
      ref={panelRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUpOrLeave}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUpOrLeave}
    >
      {categories.map((category) => (
        <CategoryButton
          key={category}
          isActive={activeCategory === category}
          onClick={handleCategoryClick}
        >
          {category}
        </CategoryButton>
      ))}
    </PanelContainer>
  );
}
