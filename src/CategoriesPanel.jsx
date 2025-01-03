import { styled } from "styled-components";
import CategoryButton from "./CategoryButton";
import { useState } from "react";

const PanelContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  overflow-x: auto; /* Пролистывание по горизонтали */
  white-space: nowrap; /* Запрещаем перенос элементов */

  /* Скрытие скроллбара */
  scrollbar-width: none; /* Скрывает скроллбар в Firefox */
  -ms-overflow-style: none; /* Скрывает скроллбар в Internet Explorer и Edge */

  &::-webkit-scrollbar {
    display: none; /* Скрывает скроллбар в WebKit-браузерах (Chrome, Safari) */
  }
`;

export default function CategoriesPanel() {
  const [activeCategory, setActiveCategory] = useState(null);

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

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    console.log(category);
  };

  return (
    <PanelContainer>
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
