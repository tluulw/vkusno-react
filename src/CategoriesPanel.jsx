import { styled } from "styled-components";
import CategoryButton from "./CategoryButton";
import { useRef, useState } from "react";

const PanelContainer = styled.div`
  margin: 0 0.5rem;
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

export default function CategoriesPanel({ categories, onClick }) {
  const [activeCategory, setActiveCategory] = useState(1); // храним айди активной категории

  const handleCategoryClick = (id) => {
    // меняем активную категорию и делаем к ней скролл
    setActiveCategory(id);

    onClick(id);
  };

  const panelRef = useRef(null); // реф для панели категорий, чтоб можно было её листать
  const [isDragging, setIsDragging] = useState(false); // перетаскивается панель или нет
  const [startX, setStartX] = useState(0); // положение панели до перетаскивания

  const handleMouseDown = (event) => {
    // фиксируем вводные, когда хотим перетащить панель
    setIsDragging(true);
    setStartX(event.pageX);
    event.preventDefault();
  };

  const handleMouseMove = (event) => {
    // двигаем панель
    if (isDragging) {
      const changex = (event.pageX - startX) / 50;
      panelRef.current.scrollLeft = panelRef.current.scrollLeft - changex;
    }
  };

  const handleMouseUpOrLeave = () => {
    // прекращаем двигать панель
    setIsDragging(false);
  };

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
            isActive={activeCategory === category.id}
            onClick={handleCategoryClick}
          >
            {category}
          </CategoryButton>
        ))}
      </PanelContainer>
    </>
  );
}
