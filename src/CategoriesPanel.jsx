import { styled } from "styled-components";
import { useRef, useState, useEffect } from "react";

const PanelContainer = styled.div`
  display: flex;
  background-color: #ffffff;
  gap: 1rem;
  padding: 0 0.5rem;
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

  &.fixed {
    position: fixed;
    z-index: 100;
    top: 50px;
    left: 0;
    right: 0;
  }
`;

const CategoryButton = styled.button`
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
  }
`;

const Placeholder = styled.div``;

export default function CategoriesPanel({
  categories,
  onClick,
  activeCategory,
  buttonRefs,
}) {
  const panelRef = useRef(null); // реф для панели категорий
  const [isDragging, setIsDragging] = useState(false); // перетаскивается панель или нет
  const [startX, setStartX] = useState(0); // положение панели до перетаскивания
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (event) => {
    // Начало перетаскивания
    setIsDragging(true);
    setStartX(event.pageX - panelRef.current.offsetLeft);
    setScrollLeft(panelRef.current.scrollLeft);
    event.preventDefault();
  };

  const handleMouseMove = (event) => {
    // Перемещение панели
    if (!isDragging) return;
    const x = event.pageX - panelRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // коэффициент скорости
    panelRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    // Завершение перетаскивания
    setIsDragging(false);
  };

  const placeHolderRef = useRef(null); // реф для заместителя панели категорий
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFixed(!entry.isIntersecting);
      },
      { root: null, threshold: 1, rootMargin: "-50px 0px 0px 0px" }
    );

    if (placeHolderRef.current) {
      observer.observe(placeHolderRef.current);
    }

    return () => {
      if (placeHolderRef.current) {
        observer.unobserve(placeHolderRef.current);
      }
    };
  }, []);

  return (
    <>
      <Placeholder
        ref={placeHolderRef}
        style={{ height: isFixed ? "40px" : "1px" }}
      />
      <PanelContainer
        ref={panelRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUpOrLeave}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUpOrLeave}
        className={isFixed && "fixed"}
      >
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            ref={(el) => (buttonRefs.current[category.id] = el)} // сохраняем реф для каждой кнопки
            className={activeCategory === category.id ? "active" : ""}
            onClick={() => onClick(category.id)}
          >
            {category.title}
          </CategoryButton>
        ))}
      </PanelContainer>
    </>
  );
}
