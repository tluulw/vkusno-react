import { styled } from "styled-components";
import { useState } from "react";

// Стили для панели
const TypesPanelContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  white-space: nowrap;
  padding: 0 0.5rem;
`;

// Стили для кнопки
const TypeButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: normal;
  color: #aaa;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #555;
  }

  &:focus {
    outline: none;
  }

  &.active {
    font-weight: bold;
    color: #000;
  }
`;

// Компонент панели
export default function TypesPanel({ types, onClick }) {
  const [activeType, setActiveType] = useState("Все");

  const handleTypeClick = (type) => {
    // меняем тип, который выводится для категории
    setActiveType(type);
    onClick(type);
  };

  return (
    <>
      {types.length > 2 && (
        <TypesPanelContainer>
          {types.map((type) => (
            <TypeButton
              className={activeType == type.title && "active"}
              key={type.id}
              onClick={() => handleTypeClick(type.title)}
            >
              {type.title}
            </TypeButton>
          ))}
        </TypesPanelContainer>
      )}
    </>
  );
}
