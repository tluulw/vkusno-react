import Banner from "./Banner";
import Header from "./Header/Header";
import CategoriesPanel from "./CategoriesPanel";
import { useState, useEffect, useRef } from "react";
import Category from "./Category";

export default function App() {
  const [isReqLoading, setIsReqLoading] = useState(false); // состояние для отслеживания загрузки запроса к бд
  const [categories, setCategories] = useState([]); // состояние для вывода категорий в панель с категориями
  const [items, setItems] = useState([
    // состояние для вывода всех позиций по категориям
    {
      title: "title",
      id: "id",
      types: [
        {
          title: "type_title",
          category_id: "category_id",
          id: "id",
          items: [],
        },
      ],
    },
  ]);

  const categoryRefs = useRef({}); // ссылки на категории
  const observer = useRef(null); // сам IntersectionObserver
  const [activeCategory, setActiveCategory] = useState(1); // активная категория
  const buttonRefs = useRef({}); // рефки для категорий в панели
  const isScrolling = useRef(false);

  const changeCategory = (id) => {
    // при клике меняем активную категорию и скроллим
    setActiveCategory(id);

    // Прокрутка панели с категориями
    if (buttonRefs.current[id]) {
      buttonRefs.current[id].scrollIntoView({
        behavior: "smooth",
        inline: "center", // Центрируем кнопку в панели
      });
    }
  };

  const handleCategoryClick = (id) => {
    isScrolling.current = true;
    // при нажатии на лого
    if (id == 0) {
      changeCategory(1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      changeCategory(id);
      if (categoryRefs.current[id]) {
        const headerHeight = 50; // высота хедера
        const categoriesPanelHeight = 41;
        const elementTop =
          categoryRefs.current[id].getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: elementTop - headerHeight - categoriesPanelHeight,
          behavior: "smooth",
        });
      }
    }
    setTimeout(() => (isScrolling.current = false), 1500);
  };

  useEffect(() => {
    // Запрос данных
    async function getCategoriesAndItems() {
      setIsReqLoading(true);
      const categoriesResponse = await fetch(
        "http://localhost:8000/categories/"
      );
      const categoriesJson = await categoriesResponse.json();
      setCategories(categoriesJson.data);

      const itemsResponse = await fetch(
        "http://localhost:8000/categories/items"
      );
      const itemsJson = await itemsResponse.json();
      setItems(itemsJson.data);
      setIsReqLoading(false);
    }

    getCategoriesAndItems();
  }, []);

  useEffect(() => {
    // Функция, вызываемая при изменении видимости
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const categoryId = entry.target.dataset.categoryId; // Получаем id категории
          {
            !isScrolling && setActiveCategory(Number(categoryId));
          } // Устанавливаем активную категорию
        }
      });
    };

    // Создаем IntersectionObserver
    observer.current = new IntersectionObserver(handleIntersect, {
      root: null, // следим в пределах окна
      rootMargin: "-40% 0px -30% 0px",
      threshold: 0.05,
    });

    // Подключаем наблюдатель к категориям
    const currentObserver = observer.current;

    Object.values(categoryRefs.current).forEach((ref) => {
      if (ref) {
        currentObserver.observe(ref);
      }
    });

    // Очищаем наблюдатель при размонтировании
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [items]); // запускаем эффект, когда меняются items

  return (
    <>
      <Header onClick={handleCategoryClick} />
      <Banner />
      <h1>Наше меню</h1>
      {isReqLoading && <div>Loading...</div>}
      {!isReqLoading && (
        <CategoriesPanel
          categories={categories}
          onClick={handleCategoryClick}
          activeCategory={activeCategory}
          buttonRefs={buttonRefs}
        />
      )}
      {!isReqLoading && (
        <>
          {items.map((category) => (
            <div
              key={category.id}
              ref={(el) => (categoryRefs.current[category.id] = el)}
              data-category-id={category.id} // сохраняем id для использования в observer
            >
              <Category category={category} />
            </div>
          ))}
        </>
      )}
    </>
  );
}
