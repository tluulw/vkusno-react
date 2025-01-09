import { styled } from "styled-components";
import CategoryButton from "./CategoryButton";
import { useEffect, useRef, useState } from "react";

const PanelContainer = styled.div`
  display: flex;
  gap: 10px;
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

export default function CategoriesPanel({ categories }) {
  const [activeCategory, setActiveCategory] = useState("Новинки");

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

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
      const changex = (event.pageX - startX) / 50;
      panelRef.current.scrollLeft = panelRef.current.scrollLeft - changex;
    }
  }

  function handleMouseUpOrLeave() {
    setIsDragging(false);
  }

  return (
    <>
      <PanelContainer
        ref={panelRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUpOrLeave}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            isActive={activeCategory === category.title}
            onClick={handleCategoryClick}
          >
            {category.title}
          </CategoryButton>
        ))}
      </PanelContainer>
    </>
  );
}
