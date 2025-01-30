import Banner from "./Banner";
import Header from "./Header/Header";
import CategoriesPanel from "./CategoriesPanel";
import { useState, useEffect, useRef } from "react";
import Category from "./Category";
import ItemModal from "./ItemModal";
import CartModal from "./Cart/CartModal";

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
    // Запрос данных
    async function getCategoriesAndItems() {
      setIsReqLoading(true);
      const categoriesResponse = await fetch("api/categories/");
      const categoriesJson = await categoriesResponse.json();
      setCategories(categoriesJson.data);

      const itemsResponse = await fetch("api/categories/items");
      const itemsJson = await itemsResponse.json();
      setItems(itemsJson.data);
      setIsReqLoading(false);
    }

    getCategoriesAndItems();
  }, []);

  const categoryRefs = useRef({}); // ссылки на категории
  const observer = useRef(null); // сам IntersectionObserver
  const [activeCategory, setActiveCategory] = useState(1); // активная категория
  const buttonRefs = useRef({}); // рефки для категорий в панели
  const isScrolling = useRef(false);

  const changeCategory = (id) => {
    // Прокрутка панели с категориями
    if (buttonRefs.current[id]) {
      buttonRefs.current[id].scrollIntoView({
        behavior: "smooth",
        inline: "center", // Центрируем кнопку в панели
      });
    }

    // при клике меняем активную категорию и скроллим
    setActiveCategory(id);
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
    setTimeout(() => (isScrolling.current = false), 1000);
  };

  useEffect(() => {
    // Функция, вызываемая при изменении видимости
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const categoryId = entry.target.dataset.categoryId; // Получаем id категории
          if (!isScrolling.current) {
            if (categoryId != 1) {
              changeCategory(Number(categoryId));
            } else {
              setActiveCategory(1);
            }
          }
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

  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [itemOpened, setItemOpened] = useState({
    id: "id",
    title: "title",
    sizes: [{ item_id: "id", image: "image", price: "price", size: "size" }],
    decription: "description",
  });

  const onItemModalClose = () => {
    setIsItemModalOpen(false);
  };

  const onItemClick = (item) => {
    setIsItemModalOpen(true);
    setItemOpened(item);
  };

  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [tg, setTg] = useState(null);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      setTg(window.Telegram.WebApp);
      setUser(window.Telegram.WebApp.initDataUnsafe?.user); // Получаем данные пользователя
    }
  }, []);

  const onCheckout = async (totalPrice, cartItems) => {
    const data = {
      chat_id: user.id,
      items: cartItems,
      total_price: totalPrice,
    };

    const request = await fetch("api/invoice/", {
      method: "POST",
      json: data,
    });

    const response = request.json();
    if (response.message == "Ok") {
      tg.openInvoice(response.invoice_link);
    }
  };

  return (
    <>
      <Header
        onLogoClick={handleCategoryClick}
        onCartClick={() => setIsCartModalOpen(true)}
      />
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
              <Category category={category} onItemClick={onItemClick} />
            </div>
          ))}
        </>
      )}
      {isItemModalOpen && (
        <ItemModal
          isOpen={isItemModalOpen}
          onClose={onItemModalClose}
          item={itemOpened}
        />
      )}
      {isCartModalOpen && (
        <CartModal
          onClose={() => setIsCartModalOpen(false)}
          onCheckout={onCheckout}
        />
      )}
    </>
  );
}
