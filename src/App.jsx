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

  useEffect(() => {
    // эффект вызывается при первом рендеринге, в нём делается запрос к бд, для получения категорий и всех позиций по категориям
    async function getCategoriesAndItems() {
      setIsReqLoading(true); // запрос выполняется
      const categoriesResponse = await fetch(
        // получение категорий
        "http://localhost:8000/categories/"
      );
      const categoriesJson = await categoriesResponse.json(); // json с категориями
      setCategories(categoriesJson.data); // запись категорий в массив
      const itemsResponse = await fetch(
        // получение всех позиций по категориям
        "http://localhost:8000/categories/items"
      );
      const itemsJson = await itemsResponse.json(); // json с позициями
      setItems(itemsJson.data); // запись позиций в массив
      setIsReqLoading(false); // запрос выполнился
    }

    getCategoriesAndItems();
  }, []);

  const categoryRefs = useRef({}); // здесь храним ссылки на все категории, чтоб с ними можно было взаимодействовать

  const scrollToCategory = (id) => {
    // проматываемся к категориям
    if (categoryRefs.current[id]) {
      // если ссылочка рабочая
      const headerHeight = 50; // высота хедера
      const elementTop =
        categoryRefs.current[id].getBoundingClientRect().top + window.scrollY; // топ нашей категории

      window.scrollTo({
        top: elementTop - headerHeight, // скролим до категории - хедер, чтоб было видно название
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Header />
      <Banner />
      <h1>Наше меню</h1>
      {isReqLoading && <div>Loading...</div>}
      {!isReqLoading && (
        <CategoriesPanel categories={categories} onClick={scrollToCategory} />
      )}
      {!isReqLoading && (
        <>
          {items.map((category) => (
            <div
              key={category.id}
              ref={(el) => (categoryRefs.current[category.id] = el)}
              data-category-id={category.id}
            >
              <Category category={category} />
            </div>
          ))}
        </>
      )}
    </>
  );
}
