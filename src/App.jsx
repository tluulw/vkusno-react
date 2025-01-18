import Banner from "./Banner";
import Header from "./Header/Header";
import CategoriesPanel from "./CategoriesPanel";
import { useState, useEffect, useRef } from "react";
import Category from "./Category";
import ItemModal from "./ItemModal";

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
    // // Запрос данных
    // async function getCategoriesAndItems() {
    //   setIsReqLoading(true);
    //   const categoriesResponse = await fetch(
    //     "https://e31c02e9-b21a-4033-9ad6-e1192395ea83.tunnel4.com/categories/"
    //   );
    //   const categoriesJson = await categoriesResponse.json();
    //   setCategories(categoriesJson.data);

    //   const itemsResponse = await fetch(
    //     "https://e31c02e9-b21a-4033-9ad6-e1192395ea83.tunnel4.com/categories/items"
    //   );
    //   const itemsJson = await itemsResponse.json();
    //   setItems(itemsJson.data);
    //   setIsReqLoading(false);
    // }
    async function getCategoriesAndItems() {
      setIsReqLoading(true);

      setCategories([
        {
          title: "Новинки",
          id: 1,
        },
        {
          title: "Популярное",
          id: 2,
        },
        {
          title: "Напитки",
          id: 4,
        },
        {
          title: "Дессерты",
          id: 5,
        },
        {
          title: "Закуски",
          id: 6,
        },
        {
          title: "Кафе",
          id: 7,
        },
        {
          title: "Бургеры и роллы",
          id: 8,
        },
        {
          title: "Разное",
          id: 9,
        },
      ]);
      setItems([
        {
          title: "Новинки",
          id: 1,
          types: [
            {
              title: "default",
              category_id: 1,
              id: 1,
              items: [
                {
                  title: "Бургер арбатский",
                  description:
                    "Бургер с сочным бифштексом из натуральной говядины на гриле, томатом, свежим салатом, нежным сыром, ломтиком копчёной индейки, уникальным соусом с ароматом малосольных огурчиков, и всё это на горячей, ржаной булочке с глазурью и гречневой посыпкой.",
                  id: 8,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/6e6/dluh0zpxtrqeo4e51vf6usq8ok31tmk3/large.png",
                      price: 279,
                      size: "247 г",
                      item_id: 8,
                    },
                  ],
                },
                {
                  title: "Пунш брусника-можжевельник",
                  description:
                    "Горячий, ароматный пунш из натурального пюре спелых ягод брусники и клюквы с лёгкими нотками можжевельника. Идеально подходит, чтобы греться зимними днями и вечерами даже в самые суровые русские морозы.",
                  id: 11,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/4b7/dl31eout44hyrmct75eeqyult9wlzk17/large.png",
                      price: 119,
                      size: "Средний",
                      item_id: 11,
                    },
                  ],
                },
                {
                  title: "Биг спешиал демиглас",
                  description:
                    "Неповторимый бургер с большим рубленым бифштексом из 100% отборной говядины на большой булочке с кунжутом. Внутри свежие овощи, сыр Эмменталь, кусочки жареного хрустящего лука, соус с дымком и соус Демиглас на основе ароматного бульона из говяжьей косточки",
                  id: 9,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/f12/zcdgmhqiigoxj2j06l2schtbupxyc5bm/large.png",
                      price: 325,
                      size: "348 г",
                      item_id: 9,
                    },
                  ],
                },
                {
                  title: "Физз вишня",
                  description:
                    "Прохладительный газированный напиток со вкусом спелой вишни",
                  id: 39,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/c27/246nv5izc9ub3dyg01akfraqbr8wcbe7/large.png",
                      price: 105,
                      size: "Маленький",
                      item_id: 39,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/b38/ri0bzbqc0hny3qq7m53knfutz5r1e9bu/large.png",
                      price: 115,
                      size: "Средний",
                      item_id: 39,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/465/nl1bubbi2ulhu5y3eg9nvcaqpc99cknz/large.png",
                      price: 125,
                      size: "Большой",
                      item_id: 39,
                    },
                  ],
                },
                {
                  title: "Бургер арбатский с курицей",
                  description:
                    "Бургер с сочной куриной котлетой в хрустящей панировке, ломтиком томата, свежим салатом, нежным сыром, яркой ноткой копченой индейки, уникальным соусом с ароматом малосольных огурчиков, и всё это на горячей, ржаной булочке с глазурью и гречневой посыпкой.",
                  id: 56,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/fcd/lpkdjr5rwu79fjl7mzklnrmzg1a29nho/large.png",
                      price: 245,
                      size: "253 г",
                      item_id: 56,
                    },
                  ],
                },
                {
                  title: "Биг спешиал демиглас ролл",
                  description:
                    "Два сочных бифштекса из 100% говядины, свежие овощи, сыр Эмменталь, кусочки жареного хрустящего лука, заправленные соусом с дымком и соусом Демиглас на основе ароматного бульона из говяжьей косточки и завёрнутые в пшеничную лепешку",
                  id: 64,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/22a/lis43yax6qf18o7qqhw9d3ltogjxggrs/large.png",
                      price: 275,
                      size: "262 г",
                      item_id: 64,
                    },
                  ],
                },
                {
                  title: "Пирожок клубника-малина",
                  description:
                    "Хрустящий пирожок с сочной начинкой из ягод клубники и малины",
                  id: 118,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/788/e5zjaq6lim3lbh43mwnk38ufbqzjbh4g/large.png",
                      price: 79,
                      size: "79 г",
                      item_id: 118,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "Популярное",
          id: 2,
          types: [
            {
              title: "default",
              category_id: 2,
              id: 2,
              items: [
                {
                  title: "Чикенбургер",
                  description:
                    "Обжаренная куриная котлета из сочного куриного мяса, панированная в сухарях, которая подается на карамелизованной булочке, заправленной свежим салатом и специальным соусом",
                  id: 61,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/8ad/1nahkiz2eeqsg2oisgzju2t0xre7lbac/large.png",
                      price: 62,
                      size: "129 г",
                      item_id: 61,
                    },
                  ],
                },
                {
                  title: "Биг хит",
                  description:
                    "Легендарный бургер с двумя рублеными бифштексами из 100% говядины, маринованными огурчиками, свежим салатом «Айсберг», ломтиком плавленого сыра Чеддер и специальным соусом «Биг Хит» на новой булочке с двумя видами кунжута",
                  id: 45,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/293/n16k6vmjoqft5b1ae5vb6v91b7odpq4l/large.png",
                      price: 186,
                      size: "228 г",
                      item_id: 45,
                    },
                  ],
                },
                {
                  title: "Чизбургер",
                  description:
                    "Рубленый бифштекс из натуральной цельной говядины с кусочками сыра Чеддер на карамелизованной булочке, заправленной горчицей, кетчупом, луком и кусочком маринованного огурчика",
                  id: 54,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/60e/3vx8erpxn4nk3qhjh5k5ufh5jye60k12/large.png",
                      price: 78,
                      size: "117 г",
                      item_id: 54,
                    },
                  ],
                },
                {
                  title: "Шримп ролл",
                  description:
                    "Нежные креветки в хрустящей панировке, свежий салат Айсберг и лук в пшеничной лепешке, заправленной специальным соусом.",
                  id: 66,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/c9d/9kfmo7o164gj8hg4x0zdu5yleh3hk54b/large.png",
                      price: 252,
                      size: "171 г",
                      item_id: 66,
                    },
                  ],
                },
                {
                  title: "Наггетсы",
                  description:
                    "Наггетсы – это сочное 100% белое куриное мясо в хрустящей панировке со специями. Только натуральная курочка без искусственных красителей и ароматизаторов и без консервантов",
                  id: 77,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/8f4/qamm9p4icqv4xjaa9o4iqz541y17nnwt/large.png",
                      price: 59,
                      size: "4 шт.",
                      item_id: 77,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/945/n8l0f6b2271kjiau0oqxfdoocjzuapey/large.png",
                      price: 85,
                      size: "6 шт.",
                      item_id: 77,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/c58/qahpcxt5u12xg1dxnxzhrda9yuoobtk0/large.png",
                      price: 115,
                      size: "9 шт.",
                      item_id: 77,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/b0c/3eeaj3xmwcwo7ned65uktnaho3hp3ykk/large.png",
                      price: 219,
                      size: "18 шт.",
                      item_id: 77,
                    },
                  ],
                },
                {
                  title: "Картофель фри",
                  description:
                    "Вкусные, обжаренные в растительном фритюре и слегка посоленные палочки картофеля",
                  id: 69,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/1f4/mi1z3is4tacie9d9pf9cbu86o7c6k8pu/large.png",
                      price: 65,
                      size: "Маленький",
                      item_id: 69,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/8d5/6wk65rb8w5p0a9il1iywri8l06w088f9/large.png",
                      price: 89,
                      size: "Средний",
                      item_id: 69,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/fd7/jzg4xts3l61ckxbv9319syf7knik185s/large.png",
                      price: 109,
                      size: "Большой",
                      item_id: 69,
                    },
                  ],
                },
                {
                  title: "Латте",
                  description:
                    "Молочный напиток с тонким ароматом эспрессо и нежной молочной пеной",
                  id: 32,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/ef7/01724ii56l1d4cj2pdwu7525phcs3dzl/large.png",
                      price: 109,
                      size: "Средний",
                      item_id: 32,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/5cb/52dewxo9ed7wnf6hlfg3oigc4pj6t6vg/large.png",
                      price: 129,
                      size: "Большой",
                      item_id: 32,
                    },
                  ],
                },
                {
                  title: "Добрый кола без сахара",
                  description: "Прохладительный газированный напиток",
                  id: 40,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/94e/zwo304mb0ul7dwzjwyf7u9z07ihii6ut/large.png",
                      price: 89,
                      size: "Маленький",
                      item_id: 40,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/f0b/18pq45gyx4a0rtf499jrr2us36aaqamr/large.png",
                      price: 99,
                      size: "Средний",
                      item_id: 40,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/83b/ad8jepifepr8ldqrrt0i139z2r9rw28x/large.png",
                      price: 109,
                      size: "Большой",
                      item_id: 40,
                    },
                  ],
                },
                {
                  title: "Пирожок клубника-малина",
                  description:
                    "Хрустящий пирожок с сочной начинкой из ягод клубники и малины",
                  id: 118,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/788/e5zjaq6lim3lbh43mwnk38ufbqzjbh4g/large.png",
                      price: 79,
                      size: "79 г",
                      item_id: 118,
                    },
                  ],
                },
                {
                  title: "Морковный торт",
                  description:
                    "Пышные морковные коржи с грецким орехом, с добавлением нежного сливочного крема, украшенные карамелью и тыквенными семечками.",
                  id: 25,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/764/62ivgwx6gq0ned3gbaiqnaadfza3i1xy/large.png",
                      price: 185,
                      size: "133 г",
                      item_id: 25,
                    },
                  ],
                },
                {
                  title: "Айс де люкс шоколадное",
                  description:
                    "Мороженое из натурального цельного молока с шоколадным топпингом и c кусочками шоколадного печенья.",
                  id: 112,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/8f0/e1dscgyv5fiew072ddshwi2ve4og8594/large.png",
                      price: 125,
                      size: "201 г",
                      item_id: 112,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/d15/n38tj2mb6t1qdko7l5pi9i2ukuiwji96/large.png",
                      price: 129,
                      size: "206 г",
                      item_id: 112,
                    },
                  ],
                },
                {
                  title: "Соус сырный",
                  description:
                    "Нежнейший сырный соус с кремовой бархатистой текстурой, моментально тающей во рту. Его вкус насыщенный, сливочный, с ярко выраженным сырным акцентом.",
                  id: 125,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/eb7/p3jixcedeyefwgqrqxhzfzl0ldhcsusc/large.png",
                      price: 45,
                      size: "25 мл",
                      item_id: 125,
                    },
                  ],
                },
                {
                  title: "Соус кисло-сладкий",
                  description:
                    "Кисло-сладкий соус — это универсальный соус, сочетающий в себе освежающую кислинку и лёгкую сладость. Этот соус сделает любое блюдо пикантным и ещё более аппетитным.",
                  id: 126,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/9cf/dmm5z5npm6z1y7xa7szc4obpzn0iafrx/large.png",
                      price: 45,
                      size: "25 мл",
                      item_id: 126,
                    },
                  ],
                },
                {
                  title: "Соус 1000 островов",
                  description:
                    "Насыщенный сливочно-томатный соус с кремовой консистенцией. Его сладковатый вкус с легкой кислинкой и пряным ароматом идеально дополнит вкус креветок.",
                  id: 127,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/eb5/3wze880q8o6503qq3wgbbpm3r1z7q5vf/large.png",
                      price: 45,
                      size: "25 мл",
                      item_id: 127,
                    },
                  ],
                },
                {
                  title: "Липтон лимон",
                  description: "Прохладительный напиток",
                  id: 2,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/a52/2k3ikrx8p75deupcpe5oo3htdq69v3p5/large.png",
                      price: 89,
                      size: "Маленький",
                      item_id: 2,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/2b1/5d5klzj4r8meae875ozntqsvei42q7lp/large.png",
                      price: 99,
                      size: "Средний",
                      item_id: 2,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/b4f/zzou09pbwbg4ly4aqc6udfpzo9ru4gvi/large.png",
                      price: 109,
                      size: "Большой",
                      item_id: 2,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "Напитки",
          id: 4,
          types: [
            {
              title: "Горячие",
              category_id: 4,
              id: 4,
              items: [
                {
                  title: "Пунш брусника-можжевельник",
                  description:
                    "Горячий, ароматный пунш из натурального пюре спелых ягод брусники и клюквы с лёгкими нотками можжевельника. Идеально подходит, чтобы греться зимними днями и вечерами даже в самые суровые русские морозы.",
                  id: 11,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/4b7/dl31eout44hyrmct75eeqyult9wlzk17/large.png",
                      price: 119,
                      size: "Средний",
                      item_id: 11,
                    },
                  ],
                },
                {
                  title: "Флэт уайт",
                  description:
                    "Флэт Уайт – яркий, с насыщенным кофейным вкусом, молочный напиток на основе эспрессо.",
                  id: 14,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/822/2sgm2w1yp6vzqavv291epn9j8uobbisj/large.png",
                      price: 135,
                      size: "Средний",
                      item_id: 14,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/699/z2hbh5l254lm3m51uqq8cvlwlii1y4dh/large.png",
                      price: 159,
                      size: "Большой",
                      item_id: 14,
                    },
                  ],
                },
                {
                  title: "Капучино",
                  description:
                    "Молочный напиток с тонким ароматом эспрессо и плотной шапкой молочной пены",
                  id: 15,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/ab8/vpahwxisk8dfbqfst5gpl943qxagnheb/large.png",
                      price: 69,
                      size: "Маленький",
                      item_id: 15,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/11f/u87k260ivbih4cen08po03ewfa8d9q7t/large.png",
                      price: 109,
                      size: "Средний",
                      item_id: 15,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/047/0dnfbp18h6el5mal08pxlksxy56tsmwo/large.png",
                      price: 129,
                      size: "Большой",
                      item_id: 15,
                    },
                  ],
                },
                {
                  title: "Латте",
                  description:
                    "Молочный напиток с тонким ароматом эспрессо и нежной молочной пеной",
                  id: 32,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/ef7/01724ii56l1d4cj2pdwu7525phcs3dzl/large.png",
                      price: 109,
                      size: "Средний",
                      item_id: 32,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/5cb/52dewxo9ed7wnf6hlfg3oigc4pj6t6vg/large.png",
                      price: 129,
                      size: "Большой",
                      item_id: 32,
                    },
                  ],
                },
                {
                  title: "Американо",
                  description:
                    "Ароматный кофе Эспрессо с золотистой пеночкой с добавлением горячей воды",
                  id: 36,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/9ff/8yophpngspjajk7bi06uazd39noyr1sk/large.png",
                      price: 60,
                      size: "Маленький",
                      item_id: 36,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/3c7/g99ow6x4a3frwfvjg6cflsnx1km2hvkw/large.png",
                      price: 89,
                      size: "Средний",
                      item_id: 36,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/15a/3810qnotr2gbuufd1geg0ckdq3ivy5a1/large.png",
                      price: 99,
                      size: "Большой",
                      item_id: 36,
                    },
                  ],
                },
                {
                  title: "Чай черный эрл грей",
                  description: "Чай черный Эрл Грей",
                  id: 33,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/79b/ukunjpe90nya9kax1i5z825n9k5s6plb/large.png",
                      price: 60,
                      size: "Маленький",
                      item_id: 33,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/ca7/5nyeecab5w13mrt9baxmk0g4sw8t6f3n/large.png",
                      price: 79,
                      size: "Средний",
                      item_id: 33,
                    },
                  ],
                },
                {
                  title: "Чай черный",
                  description: "Чай черный",
                  id: 34,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/5a0/ww5pwjs2ehowirok518axftnvw4rxnts/large.png",
                      price: 60,
                      size: "Маленький",
                      item_id: 34,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/e37/0ns6bhwwxfapqyqaq8cbdbmq4pl8swov/large.png",
                      price: 79,
                      size: "Средний",
                      item_id: 34,
                    },
                  ],
                },
                {
                  title: "Чай зеленый",
                  description: "Чай зеленый",
                  id: 35,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/f36/oucvjvzpwiskf1upjyehr50zci5amim7/large.png",
                      price: 60,
                      size: "Маленький",
                      item_id: 35,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/150/f0szje4so37dlzhssnjqtywba7sg0xn0/large.png",
                      price: 79,
                      size: "Средний",
                      item_id: 35,
                    },
                  ],
                },
                {
                  title: "Кофе глясе",
                  description: "Ароматный Американо с добавлением мороженого",
                  id: 37,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/f72/yngkpd821cm38jedmdbqcmm7n753tz25/large.png",
                      price: 109,
                      size: "Средний",
                      item_id: 37,
                    },
                  ],
                },
                {
                  title: "Двойной эспрессо",
                  description:
                    "Крепкий кофе с тонкой золотистой кофейной пенкой крема",
                  id: 38,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/27a/ouo0m0dtjm31lggwarrpubziq6n2ac3x/large.png",
                      price: 75,
                      size: "70 мл",
                      item_id: 38,
                    },
                  ],
                },
              ],
            },
            {
              title: "Холодные",
              category_id: 4,
              id: 5,
              items: [
                {
                  title: "Липтон зеленый",
                  description: "Прохладительный напиток",
                  id: 1,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/9b0/rkl5ww74gtmqdfxvb1w73k2rwh8o1emc/large.png",
                      price: 99,
                      size: "Средний",
                      item_id: 1,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/eea/nw8rikw6hadhtbk8fz49u5ebfscvllet/large.png",
                      price: 109,
                      size: "Большой",
                      item_id: 1,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/838/onuziwph5y379y1tbdg6p1vkqagtakk4/large.png",
                      price: 89,
                      size: "Маленький",
                      item_id: 1,
                    },
                  ],
                },
                {
                  title: "Липтон лимон",
                  description: "Прохладительный напиток",
                  id: 2,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/a52/2k3ikrx8p75deupcpe5oo3htdq69v3p5/large.png",
                      price: 89,
                      size: "Маленький",
                      item_id: 2,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/2b1/5d5klzj4r8meae875ozntqsvei42q7lp/large.png",
                      price: 99,
                      size: "Средний",
                      item_id: 2,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/b4f/zzou09pbwbg4ly4aqc6udfpzo9ru4gvi/large.png",
                      price: 109,
                      size: "Большой",
                      item_id: 2,
                    },
                  ],
                },
                {
                  title: "Физз вишня",
                  description:
                    "Прохладительный газированный напиток со вкусом спелой вишни",
                  id: 39,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/c27/246nv5izc9ub3dyg01akfraqbr8wcbe7/large.png",
                      price: 105,
                      size: "Маленький",
                      item_id: 39,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/b38/ri0bzbqc0hny3qq7m53knfutz5r1e9bu/large.png",
                      price: 115,
                      size: "Средний",
                      item_id: 39,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/465/nl1bubbi2ulhu5y3eg9nvcaqpc99cknz/large.png",
                      price: 125,
                      size: "Большой",
                      item_id: 39,
                    },
                  ],
                },
                {
                  title: "Добрый кола без сахара",
                  description: "Прохладительный газированный напиток",
                  id: 40,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/94e/zwo304mb0ul7dwzjwyf7u9z07ihii6ut/large.png",
                      price: 89,
                      size: "Маленький",
                      item_id: 40,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/f0b/18pq45gyx4a0rtf499jrr2us36aaqamr/large.png",
                      price: 99,
                      size: "Средний",
                      item_id: 40,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/83b/ad8jepifepr8ldqrrt0i139z2r9rw28x/large.png",
                      price: 109,
                      size: "Большой",
                      item_id: 40,
                    },
                  ],
                },
                {
                  title: "Добрый кола",
                  description: "Прохладительный газированный напиток",
                  id: 41,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/54c/y2ajkv3wf5uqtz06ubmin90jrq4aeibn/large.png",
                      price: 89,
                      size: "Маленький",
                      item_id: 41,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/f92/kp105ykft5v51idh28kf99da8586zwkh/large.png",
                      price: 99,
                      size: "Средний",
                      item_id: 41,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/465/ieyhw1rru28adsk1ivtcpib0qtzgcqa8/large.png",
                      price: 109,
                      size: "Большой",
                      item_id: 41,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/7aa/pvbooreu1au64nn8vc2xxxrtw77jtpki/large.png",
                      price: 125,
                      size: "500 мл",
                      item_id: 41,
                    },
                  ],
                },
                {
                  title: "Добрый апельсин",
                  description: "Прохладительный газированный напиток",
                  id: 42,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/1e3/lhar4qvkvsgeu931iix6xlfpzc87xj09/large.png",
                      price: 89,
                      size: "Маленький",
                      item_id: 42,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/6d7/v73pjo9qw4pkdq73torwlcdosomg5mhz/large.png",
                      price: 99,
                      size: "Средний",
                      item_id: 42,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/72d/939c87qrjg5y07qla24w20exhy1oj625/large.png",
                      price: 109,
                      size: "Большой",
                      item_id: 42,
                    },
                  ],
                },
                {
                  title: "Добрый лимон-лайм",
                  description: "Прохладительный газированный напиток",
                  id: 43,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/bb8/uscvh7k8gkz8ao5v239qn07uf7g28uxn/large.png",
                      price: 89,
                      size: "Маленький",
                      item_id: 43,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/f8c/7wgvg9h16lqoerdrg0pbix4p5lf0szvb/large.png",
                      price: 99,
                      size: "Средний",
                      item_id: 43,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/d16/5ru33n02yr4v5vf6laf7bf150lp602ru/large.png",
                      price: 109,
                      size: "Большой",
                      item_id: 43,
                    },
                  ],
                },
              ],
            },
            {
              title: "Соки",
              category_id: 4,
              id: 6,
              items: [
                {
                  title: "Апельсиновый сок",
                  description: "Свежевосстановленный апельсиновый сок",
                  id: 3,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/3e8/g8fna3sff0rcxp8ysattttoft461n5ne/large.png",
                      price: 92,
                      size: "Маленький",
                      item_id: 3,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/4ae/d0rnwr628vroccj265sosmgjwiuymvyy/large.png",
                      price: 105,
                      size: "Средний",
                      item_id: 3,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/6d2/i6rqmgp63a588w8secxp11eg0u40z3bz/large.png",
                      price: 115,
                      size: "Большой",
                      item_id: 3,
                    },
                  ],
                },
                {
                  title: "Яблочный сок",
                  description: "Свежевосстановленный яблочный сок",
                  id: 4,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/230/qr9z0101ywsw85jjv05rtvg2tamurdjs/large.png",
                      price: 92,
                      size: "Маленький",
                      item_id: 4,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/b14/71nb3stdc40wroo2hnjay8up1vhe592g/large.png",
                      price: 105,
                      size: "Средний",
                      item_id: 4,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/708/bdxz5cpg2g511nd1s2r7hxpxdffzhs9u/large.png",
                      price: 115,
                      size: "Большой",
                      item_id: 4,
                    },
                  ],
                },
              ],
            },
            {
              title: "Молочные коктейли",
              category_id: 4,
              id: 7,
              items: [
                {
                  title: "Молочный коктейль шоколадный",
                  description:
                    "Великолепно взбитый коктейль, приготовленный из высококачественной молочной смеси и шоколадного сиропа",
                  id: 5,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/56c/g480xj66p6le1xgosru3la6y8dgwvv3w/large.png",
                      price: 89,
                      size: "Маленький",
                      item_id: 5,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/883/0mu58cvq76ytc53yocwvn33cl0wzpzhx/large.png",
                      price: 109,
                      size: "Средний",
                      item_id: 5,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/7de/92cl4l9xzhpnumedhfjxsigz2zs52g0i/large.png",
                      price: 149,
                      size: "Большой",
                      item_id: 5,
                    },
                  ],
                },
                {
                  title: "Молочный коктейль клубничный",
                  description:
                    "Великолепно взбитый коктейль, приготовленный из высококачественной молочной смеси и клубничного сиропа",
                  id: 6,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/5f3/6b4mn8ul92or4202snntx1wrodlj9pwm/large.png",
                      price: 89,
                      size: "Маленький",
                      item_id: 6,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/350/ogcs83akguk2cfr5gfxx3y0drhvd78w7/large.png",
                      price: 109,
                      size: "Средний",
                      item_id: 6,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/afb/mpc6yt9ko4a6a0jd6b9rqqfyxyv0c5ob/large.png",
                      price: 149,
                      size: "Большой",
                      item_id: 6,
                    },
                  ],
                },
                {
                  title: "Молочный коктейль ванильный",
                  description:
                    "Великолепно взбитый коктейль, приготовленный из высококачественной молочной смеси и ванильного сиропа",
                  id: 7,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/94b/cxmcvye0ijmo0bb6r5tud5030qjeww8d/large.png",
                      price: 89,
                      size: "Маленький",
                      item_id: 7,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/ebe/otyzddf0aekgf2vxz0vxti4pr0cnb53a/large.png",
                      price: 109,
                      size: "Средний",
                      item_id: 7,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/846/z83a0j3rmv0hqoieqvk396ixnf2mykxw/large.png",
                      price: 149,
                      size: "Большой",
                      item_id: 7,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "Дессерты",
          id: 5,
          types: [
            {
              title: "Дессерты",
              category_id: 5,
              id: 8,
              items: [
                {
                  title: "Торт шоколадный",
                  description:
                    "Шоколадный бисквит, наполненный шоколадным кремом.",
                  id: 28,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/1cb/2m34y1kkr4cnw4fve9orr5zgtth29wos/large.png",
                      price: 185,
                      size: "112 г",
                      item_id: 28,
                    },
                  ],
                },
                {
                  title: "Тирамису",
                  description:
                    "Классический десерт с мягким кофейным бисквитом, нежным муссом со вкусом сыра маскарпоне и ароматным какао",
                  id: 30,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/c6b/tqn0sy3dnohffdbck7b5reodueue3jlq/large.png",
                      price: 175,
                      size: "100 г",
                      item_id: 30,
                    },
                  ],
                },
                {
                  title: "Чизкейк классический",
                  description:
                    "Классический нежный десерт из сливочного сыра на песочной основе",
                  id: 58,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/1ab/ekjdcpqmxvtdj9od915rs0hmgksfqnn9/large.png",
                      price: 185,
                      size: "125 г",
                      item_id: 58,
                    },
                  ],
                },
                {
                  title: "Пирожок клубника-малина",
                  description:
                    "Хрустящий пирожок с сочной начинкой из ягод клубники и малины",
                  id: 118,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/788/e5zjaq6lim3lbh43mwnk38ufbqzjbh4g/large.png",
                      price: 79,
                      size: "79 г",
                      item_id: 118,
                    },
                  ],
                },
                {
                  title: "Пирожок вишневый",
                  description:
                    "Обжаренный во фритюре пирожок со сладкой начинкой из вишни",
                  id: 119,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/9f9/h08aefhf3vqkqj4897hlr2jbntuhm00r/large.png",
                      price: 65,
                      size: "80 г",
                      item_id: 119,
                    },
                  ],
                },
                {
                  title: "Яблочное пюре",
                  description: "Фруктовое пюре",
                  id: 120,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/f9b/zuydebepueog8jc1ciavemuobfas8xli/large.png",
                      price: 71,
                      size: "90 г",
                      item_id: 120,
                    },
                  ],
                },
              ],
            },
            {
              title: "Мороженое",
              category_id: 5,
              id: 26,
              items: [
                {
                  title: "Айс де люкс шоколадное",
                  description:
                    "Мороженое из натурального цельного молока с шоколадным топпингом и c кусочками шоколадного печенья.",
                  id: 112,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/8f0/e1dscgyv5fiew072ddshwi2ve4og8594/large.png",
                      price: 125,
                      size: "201 г",
                      item_id: 112,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/d15/n38tj2mb6t1qdko7l5pi9i2ukuiwji96/large.png",
                      price: 129,
                      size: "206 г",
                      item_id: 112,
                    },
                  ],
                },
                {
                  title: "Айс де люкс шоколадно-карамельное",
                  description:
                    "Мороженое из натурального цельного молока с карамельным топпингом и c кусочками шоколадного печенья.",
                  id: 113,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/50f/ad7ekimdff313y19hm72g9fvqhcyhoqp/large.png",
                      price: 125,
                      size: "203 г",
                      item_id: 113,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/6f6/c2k8hzo3uqozvwset729wtys94gspjb8/large.png",
                      price: 129,
                      size: "208 г",
                      item_id: 113,
                    },
                  ],
                },
                {
                  title: "Мороженое карамельное",
                  description:
                    "Мороженое из натурального цельного молока с добавкой карамельного наполнителя",
                  id: 115,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/09e/jnfblkghjhve6oragxe9lb1t99nd0dra/large.png",
                      price: 89,
                      size: "175 г",
                      item_id: 115,
                    },
                  ],
                },
                {
                  title: "Вафельный рожок",
                  description:
                    "Классическое мороженое из натурального цельного молока в румяной хрустящей вафле",
                  id: 117,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/b69/54v77q7q6o9mkyx9f0nikdstzkx91y4j/large.png",
                      price: 39,
                      size: "98 г",
                      item_id: 117,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "Закуски",
          id: 6,
          types: [
            {
              title: "Салаты",
              category_id: 6,
              id: 10,
              items: [
                {
                  title: "Овощной салат",
                  description:
                    "Хрустящие листья салата Айсберг, сочные томаты черри и маслины",
                  id: 16,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/4a7/gujry4rveyczb584kzv1mco96rb4moby/large.png",
                      price: 109,
                      size: "96 г",
                      item_id: 16,
                    },
                  ],
                },
                {
                  title: "Салат цезарь",
                  description:
                    "Хрустящие листья салата айсберг, сочные томаты черри, тертый сыр пармезан и нежнейшие куриные стрипсы.",
                  id: 82,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/59c/5za5yl2f648fy2dj3w46bxl1jpe3zx5l/large.png",
                      price: 179,
                      size: "156 г",
                      item_id: 82,
                    },
                  ],
                },
                {
                  title: "Салат цезарь с креветками",
                  description:
                    "Хрустящие листья салата айсберг, сочные томаты черри, тертый сыр пармезан и жареные креветки в панировке.",
                  id: 83,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/994/9xud0axnh9e13z9naz07uqlqc0wrtncd/large.png",
                      price: 239,
                      size: "146 г",
                      item_id: 83,
                    },
                  ],
                },
              ],
            },
            {
              title: "Стартеры",
              category_id: 6,
              id: 11,
              items: [
                {
                  title: "Куриные крылышки",
                  description:
                    "Аппетитные куриные крылышки в пикантной, хрустящей панировке. Еще вкуснее с соусом Барбекю!",
                  id: 76,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/881/mo100t3x9biwpwa5mc2s8v9013dm270u/large.png",
                      price: 145,
                      size: "3 шт.",
                      item_id: 76,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/49d/a0bdgqaa9uwzij6341sfemzmy0axpr9g/large.png",
                      price: 219,
                      size: "5 шт.",
                      item_id: 76,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/76a/okimfp30tl93ehp91ci6tffaxmmvv33m/large.png",
                      price: 305,
                      size: "7 шт.",
                      item_id: 76,
                    },
                  ],
                },
                {
                  title: "Наггетсы",
                  description:
                    "Наггетсы – это сочное 100% белое куриное мясо в хрустящей панировке со специями. Только натуральная курочка без искусственных красителей и ароматизаторов и без консервантов",
                  id: 77,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/8f4/qamm9p4icqv4xjaa9o4iqz541y17nnwt/large.png",
                      price: 59,
                      size: "4 шт.",
                      item_id: 77,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/945/n8l0f6b2271kjiau0oqxfdoocjzuapey/large.png",
                      price: 85,
                      size: "6 шт.",
                      item_id: 77,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/c58/qahpcxt5u12xg1dxnxzhrda9yuoobtk0/large.png",
                      price: 115,
                      size: "9 шт.",
                      item_id: 77,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/b0c/3eeaj3xmwcwo7ned65uktnaho3hp3ykk/large.png",
                      price: 219,
                      size: "18 шт.",
                      item_id: 77,
                    },
                  ],
                },
                {
                  title: "Стрипсы",
                  description:
                    "Сочная, нежная курица в хрустящей панировке. Попробуйте стрипсы из 100% белого мяса!",
                  id: 78,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/245/lmz9enfvj1t27ilng3gi3u8otsae5xja/large.png",
                      price: 125,
                      size: "3 шт.",
                      item_id: 78,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/ee5/br4upofjluojnwjflzwmd3alefzhktet/large.png",
                      price: 199,
                      size: "5 шт.",
                      item_id: 78,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/4f3/jmuf0xhk0asokqgozz991bvyupltkqeb/large.png",
                      price: 265,
                      size: "7 шт.",
                      item_id: 78,
                    },
                  ],
                },
                {
                  title: "Большие креветки",
                  description:
                    "Королевские креветки в хрустящей панировке. Еще аппетитнее с соусом 1000 островов. Легко. Изысканно. Вкусно",
                  id: 79,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/df0/ct9adhy4x6vmnl7o95c0d10z9lue9i2v/large.png",
                      price: 195,
                      size: "4 шт.",
                      item_id: 79,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/90e/lsg82x6bhnyv8kcqdfof4n0f2gc6yare/large.png",
                      price: 255,
                      size: "6 шт.",
                      item_id: 79,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/cd3/6pt9y1aqox1lzg2q629gnnt1tj0bkwbk/large.png",
                      price: 359,
                      size: "9 шт.",
                      item_id: 79,
                    },
                  ],
                },
                {
                  title: "Морковные палочки",
                  description:
                    "Полезный и полностью натуральный овощной десерт, пригодный для быстрого перекуса.",
                  id: 80,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/539/6v230w0g44h0w60aofeokozha31vb3z5/large.png",
                      price: 71,
                      size: "80 г",
                      item_id: 80,
                    },
                  ],
                },
                {
                  title: "Яблочные дольки",
                  description: "Отборные, свежие яблоки, резанные дольками.",
                  id: 81,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/8e2/svsb0axkie4lke0gxbreolupy5npzjo5/large.png",
                      price: 71,
                      size: "80 г",
                      item_id: 81,
                    },
                  ],
                },
              ],
            },
            {
              title: "Картошка",
              category_id: 6,
              id: 12,
              items: [
                {
                  title: "Гранд фри",
                  description:
                    "Большие, вкусные палочки картофеля, обжаренные в растительном фритюре и слегка посоленные",
                  id: 68,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/69f/5x3sc4dhi3927ocnp1sdl4r5344caesx/large.png",
                      price: 65,
                      size: "Маленький",
                      item_id: 68,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/c06/ldo7j2rjhdb1byvphndhn6wdzhaounzd/large.png",
                      price: 89,
                      size: "Средний",
                      item_id: 68,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/cd0/6f3u1g7c83zw6j0fp3si9cfb02onecbe/large.png",
                      price: 109,
                      size: "Большой",
                      item_id: 68,
                    },
                  ],
                },
                {
                  title: "Картофель фри",
                  description:
                    "Вкусные, обжаренные в растительном фритюре и слегка посоленные палочки картофеля",
                  id: 69,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/1f4/mi1z3is4tacie9d9pf9cbu86o7c6k8pu/large.png",
                      price: 65,
                      size: "Маленький",
                      item_id: 69,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/8d5/6wk65rb8w5p0a9il1iywri8l06w088f9/large.png",
                      price: 89,
                      size: "Средний",
                      item_id: 69,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/fd7/jzg4xts3l61ckxbv9319syf7knik185s/large.png",
                      price: 109,
                      size: "Большой",
                      item_id: 69,
                    },
                  ],
                },
                {
                  title: "Картофельные дольки",
                  description:
                    "Аппетитные ломтики картофеля, обжаренные в растительном масле с добавлением соли",
                  id: 70,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/081/72y1qtjs36o2odw7jgkw2v6qpgvw1h8f/large.png",
                      price: 99,
                      size: "Средние",
                      item_id: 70,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/9ed/ht79yocnt734doymzlkvzsx69ayjg67l/large.png",
                      price: 125,
                      size: "Большие",
                      item_id: 70,
                    },
                  ],
                },
                {
                  title: "Картофель по-деревенски",
                  description:
                    "Вкусные, обжаренные в растительном фритюре ломтики картофеля со специями",
                  id: 71,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/a89/72ujr5r5e4yxf34z7cct5g1ksyqooqts/large.png",
                      price: 99,
                      size: "Средний",
                      item_id: 71,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/e04/v1inrnjv61zek8mwiq3ci8gm14aw2hid/large.png",
                      price: 125,
                      size: "Большой",
                      item_id: 71,
                    },
                  ],
                },
                {
                  title: "Картофель фри двойной",
                  description:
                    "Самая большая порция Картофеля Фри для двойного удовольствия. В два раза больше вкусных картофельных палочек, обжаренных во фритюре. Подойдет для семьи или большой компании.",
                  id: 72,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/26b/fre9f7tzjfzwnqdg5gpi2qd8mrlj01zs/large.png",
                      price: 179,
                      size: "220 г",
                      item_id: 72,
                    },
                  ],
                },
                {
                  title: "Гранд фри двойной",
                  description:
                    "Удвоили порцию Гранд Фри — теперь еще больше грандиозного вкуса в одной упаковке! Слегка подсоленный картофель, нарезанный большими палочками и обжаренный во фритюре, — хватит на всех.",
                  id: 73,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/7ea/hctd26hw3v0rae8lrj98a7qmrnr1jzfs/large.png",
                      price: 179,
                      size: "270 г",
                      item_id: 73,
                    },
                  ],
                },
                {
                  title: "Картофель по-деревенски двойной",
                  description:
                    "Лучше Картофеля по-деревенски — только двойная порция Картофеля по-деревенски! Много хрустящих обжаренных картофельных ломтиков со специями. Отличный вариант, чтобы поделиться с семьей или друзьями.",
                  id: 74,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/cae/8y2opthw97opj02ota4u2s56dnv4t5n5/large.png",
                      price: 199,
                      size: "330 г",
                      item_id: 74,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "Кафе",
          id: 7,
          types: [
            {
              title: "Дессерты",
              category_id: 7,
              id: 13,
              items: [
                {
                  title: "Печенье шоколадное с кусочками шоколада",
                  description:
                    "Шоколадное песочное печенье с кусочками белого и молочного шоколада",
                  id: 10,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/e48/o7e8nyb4j7ggwr3m31ijdz79ss07cb2u/large.png",
                      price: 85,
                      size: "70 г",
                      item_id: 10,
                    },
                  ],
                },
                {
                  title: "Улитка с карамелью",
                  description:
                    "Воздушная булочка из слоёного теста, украшенная орехами и карамельной глазурью.",
                  id: 17,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/8a9/m3xq11sfwpbzqwtgmdhck4lb36f7sq2y/large.png",
                      price: 145,
                      size: "95 г",
                      item_id: 17,
                    },
                  ],
                },
                {
                  title: "Шоколадный тарт с вишней",
                  description:
                    "Воздушный шоколадный десерт на тонком песочном тесте, с нежной шоколадной прослойкой, украшен сочной вишней сверху",
                  id: 18,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/4db/vf24iyqp2hfrlno4593967y2cjvuu9fy/large.png",
                      price: 195,
                      size: "120 г",
                      item_id: 18,
                    },
                  ],
                },
                {
                  title: "Малиновая тарталетка",
                  description:
                    "Корзиночка из песочного теста со взбитым нежным кремом и спелой свежей малиной",
                  id: 21,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/994/7cyeqy5j3xff5jayw7u7jbtue3oqxyvm/large.png",
                      price: 209,
                      size: "120 г",
                      item_id: 21,
                    },
                  ],
                },
                {
                  title: "Розан с ванильным кремом",
                  description:
                    "Выпечка из слоеного дрожжевого теста с начинкой из натуральной малины и ванильного крема",
                  id: 24,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/b94/tbda3wjshdl81czraonudhv5shzr9qn0/large.png",
                      price: 119,
                      size: "95 г",
                      item_id: 24,
                    },
                  ],
                },
                {
                  title: "Морковный торт",
                  description:
                    "Пышные морковные коржи с грецким орехом, с добавлением нежного сливочного крема, украшенные карамелью и тыквенными семечками.",
                  id: 25,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/764/62ivgwx6gq0ned3gbaiqnaadfza3i1xy/large.png",
                      price: 185,
                      size: "133 г",
                      item_id: 25,
                    },
                  ],
                },
                {
                  title: "Торт шоколадный",
                  description:
                    "Шоколадный бисквит, наполненный шоколадным кремом.",
                  id: 28,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/1cb/2m34y1kkr4cnw4fve9orr5zgtth29wos/large.png",
                      price: 185,
                      size: "112 г",
                      item_id: 28,
                    },
                  ],
                },
                {
                  title: "Чизкейк классический",
                  description:
                    "Классический нежный десерт из сливочного сыра на песочной основе",
                  id: 58,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/1ab/ekjdcpqmxvtdj9od915rs0hmgksfqnn9/large.png",
                      price: 185,
                      size: "125 г",
                      item_id: 58,
                    },
                  ],
                },
                {
                  title: "Айс де люкс шоколадное",
                  description:
                    "Мороженое из натурального цельного молока с шоколадным топпингом и c кусочками шоколадного печенья.",
                  id: 112,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/8f0/e1dscgyv5fiew072ddshwi2ve4og8594/large.png",
                      price: 125,
                      size: "201 г",
                      item_id: 112,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/d15/n38tj2mb6t1qdko7l5pi9i2ukuiwji96/large.png",
                      price: 129,
                      size: "206 г",
                      item_id: 112,
                    },
                  ],
                },
                {
                  title: "Айс де люкс шоколадно-карамельное",
                  description:
                    "Мороженое из натурального цельного молока с карамельным топпингом и c кусочками шоколадного печенья.",
                  id: 113,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/50f/ad7ekimdff313y19hm72g9fvqhcyhoqp/large.png",
                      price: 125,
                      size: "203 г",
                      item_id: 113,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/6f6/c2k8hzo3uqozvwset729wtys94gspjb8/large.png",
                      price: 129,
                      size: "208 г",
                      item_id: 113,
                    },
                  ],
                },
                {
                  title: "Мороженое карамельное",
                  description:
                    "Мороженое из натурального цельного молока с добавкой карамельного наполнителя",
                  id: 115,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/09e/jnfblkghjhve6oragxe9lb1t99nd0dra/large.png",
                      price: 89,
                      size: "175 г",
                      item_id: 115,
                    },
                  ],
                },
                {
                  title: "Вафельный рожок",
                  description:
                    "Классическое мороженое из натурального цельного молока в румяной хрустящей вафле",
                  id: 117,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/b69/54v77q7q6o9mkyx9f0nikdstzkx91y4j/large.png",
                      price: 39,
                      size: "98 г",
                      item_id: 117,
                    },
                  ],
                },
              ],
            },
            {
              title: "Напитки",
              category_id: 7,
              id: 14,
              items: [
                {
                  title: "Капучино черешня",
                  description:
                    "Классический Капучино с воздушной молочной пенкой и сиропом со вкусом черешни",
                  id: 12,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/d92/otpti45txioka2iw3vi35lolarflwyka/large.png",
                      price: 159,
                      size: "Средний",
                      item_id: 12,
                    },
                  ],
                },
                {
                  title: "Латте черешня",
                  description:
                    "Классический Латте с нежной молочной пеной и сиропом со вкусом черешни",
                  id: 13,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/33a/jkf610om8vl6bud38zvydl1n48llemom/large.png",
                      price: 159,
                      size: "Средний",
                      item_id: 13,
                    },
                  ],
                },
                {
                  title: "Раф черника-каштан",
                  description:
                    "Молочный напиток с тонким ароматом эспрессо и вспененными сливками со вкусом черники и жареного каштана",
                  id: 90,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/162/cuu14by2qgb1tw4rgifutmp0wc6zp0pc/large.png",
                      price: 195,
                      size: "Средний",
                      item_id: 90,
                    },
                  ],
                },
                {
                  title: "Фраппе карамельный",
                  description:
                    "Лёгкий освежающий напиток с нежным вкусом карамели, украшенный взбитыми сливками и соусом из карамели.",
                  id: 91,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/513/wykct1gp62bcmfxr8m5650x103m2bfhc/large.png",
                      price: 159,
                      size: "Средний",
                      item_id: 91,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/b92/6zfl65djz08gsecsvmuikmczn9t0ipv9/large.png",
                      price: 210,
                      size: "Большой",
                      item_id: 91,
                    },
                  ],
                },
                {
                  title: "Фраппе клубничный",
                  description:
                    "Однородный кремообразный сливочный напиток без крупных кубиков льда. Имеет умеренный клубничный вкус. Сверху напиток украшается взбитыми сливками и клубничным соусом.",
                  id: 92,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/164/q7sk80lb3mdsrivvrb5r7dfty1v9ai6f/large.png",
                      price: 159,
                      size: "Средний",
                      item_id: 92,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/14a/hygv1qin275kea5ozqhp7zzx2otn6uhf/large.png",
                      price: 210,
                      size: "Большой",
                      item_id: 92,
                    },
                  ],
                },
                {
                  title: "Миндальный капучино",
                  description:
                    "Выбирайте напитки Кафе теперь и на миндальной основе!",
                  id: 93,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/bd8/wq9qmkea7nez2cyu1ve57ew6fgm013ai/large.png",
                      price: 129,
                      size: "Маленький",
                      item_id: 93,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/5c9/8ay2f5hk1bbzfoelmkvnmgfd9yssmrp8/large.png",
                      price: 169,
                      size: "Средний",
                      item_id: 93,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/3f8/fj8xkjshi68azkc6knkjg7t0mctrdsfq/large.png",
                      price: 189,
                      size: "Большой",
                      item_id: 93,
                    },
                  ],
                },
                {
                  title: "Кокосовый капучино",
                  description:
                    "Выбирайте напитки Кафе теперь и на кокосовой основе!",
                  id: 94,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/90d/2d0nvty9o1ob73ohzobrld4l9wy5ioak/large.png",
                      price: 129,
                      size: "Маленький",
                      item_id: 94,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/96e/kqvpyzozvz0d8n2pt79d3q4r40dy609t/large.png",
                      price: 169,
                      size: "Средний",
                      item_id: 94,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/4bd/oomptwif40ta50rojrlqtls23lch97jz/large.png",
                      price: 189,
                      size: "Большой",
                      item_id: 94,
                    },
                  ],
                },
                {
                  title: "Миндальный латте",
                  description:
                    "Выбирайте напитки Кафе теперь и на миндальной основе!",
                  id: 95,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/67d/lq3p3c6mpf2ameal283vq4yhv7u1t70i/large.png",
                      price: 169,
                      size: "Средний",
                      item_id: 95,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/dc4/ixpbvpqsvyzr6bzdi818m8otzc90vpvb/large.png",
                      price: 189,
                      size: "Большой",
                      item_id: 95,
                    },
                  ],
                },
                {
                  title: "Кокосовый латте",
                  description:
                    "Выбирайте напитки Кафе теперь и на кокосовой основе!",
                  id: 96,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/808/y593z0jidctzlod62judb8emxhqrohl4/large.png",
                      price: 169,
                      size: "Средний",
                      item_id: 96,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/857/ngzf8xrm7ltcjyjs1lo28ax89jm395o1/large.png",
                      price: 189,
                      size: "Большой",
                      item_id: 96,
                    },
                  ],
                },
                {
                  title: "Миндальный флэт уайт",
                  description:
                    "Выбирайте напитки Кафе теперь и на миндальной основе!",
                  id: 97,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/1e3/dxcgnzztq4fvewp8tx0ao657euglqa16/large.png",
                      price: 195,
                      size: "Средний",
                      item_id: 97,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/54d/m6sthlbgalup5asq31whzzxbpb9l1b93/large.png",
                      price: 219,
                      size: "Большой",
                      item_id: 97,
                    },
                  ],
                },
                {
                  title: "Кокосовый флэт уайт",
                  description:
                    "Выбирайте напитки Кафе теперь и на кокосовой основе!",
                  id: 98,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/503/h0h0xuhep9dmz4u9ki4plmkrnhjw9ruz/large.png",
                      price: 195,
                      size: "Средний",
                      item_id: 98,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/229/u6bt910l3n3g8bfae0qd1qdyw6g0ik70/large.png",
                      price: 219,
                      size: "Большой",
                      item_id: 98,
                    },
                  ],
                },
                {
                  title: "Венский кофе",
                  description:
                    "Черный кофе со взбитыми сливками, украшенный шоколадной пудрой",
                  id: 102,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/9c3/5a5ze7c7okiwbizvvvcobra6vfk3xs5s/large.png",
                      price: 155,
                      size: "Средний",
                      item_id: 102,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/b26/wbpf28vb4sk3v1dr1i7moldrld0jbllj/large.png",
                      price: 210,
                      size: "Большой",
                      item_id: 102,
                    },
                  ],
                },
                {
                  title: "Горячий шоколад",
                  description:
                    "Горячий напиток с нежным сливочным вкусом, приготовленный на основе вспененного молока с шоколадной пудрой. Поверхность напитка украшается взбитыми сливками и посыпается шоколадным какао-порошком.",
                  id: 103,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/6da/s8t0fuu09k74i8bi23ae2w09vbrmlzls/large.png",
                      price: 185,
                      size: "Средний",
                      item_id: 103,
                    },
                  ],
                },
                {
                  title: "Раф",
                  description:
                    "Молочный напиток с тонким ароматом эспрессо и вспененных сливок.",
                  id: 104,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/131/ycz1tiparaslwma1x7yujzr9wmhf8uw1/large.png",
                      price: 155,
                      size: "Средний",
                      item_id: 104,
                    },
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/3e6/tl242vjmwpli5wqu9qi8wto4a8haibq6/large.png",
                      price: 210,
                      size: "Большой",
                      item_id: 104,
                    },
                  ],
                },
                {
                  title: "Чай черный с чабрецом",
                  description: "Ароматный чай с насыщенным вкусом.",
                  id: 105,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/5e6/acdbnob2ime0mdr7ouspuv6nnmzm26z3/large.png",
                      price: 99,
                      size: "Большой",
                      item_id: 105,
                    },
                  ],
                },
                {
                  title: "Чай зеленый с жасмином",
                  description: "Ароматный чай с насыщенным вкусом.",
                  id: 106,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/b3a/5wlgnyv5da3j55l6pgl647phkys2ozuz/large.png",
                      price: 99,
                      size: "Большой",
                      item_id: 106,
                    },
                  ],
                },
                {
                  title: "Чай хуго коктейль",
                  description: "Ароматный чай с насыщенным вкусом.",
                  id: 107,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/d13/026hsz5e14ki9p4glpkbef31djl3ldun/large.png",
                      price: 99,
                      size: "Большой",
                      item_id: 107,
                    },
                  ],
                },
                {
                  title: "Чай зеленый лайм-имбирь",
                  description:
                    "Ароматный листовой чай с насыщенным вкусом лайма и имбиря",
                  id: 108,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/a4f/zstirju04opodh6uodbcflqp6w7z94ww/large.png",
                      price: 105,
                      size: "Большой",
                      item_id: 108,
                    },
                  ],
                },
                {
                  title: "Чай черный тропические фрукты",
                  description:
                    "ароматный листовой чай с насыщенным вкусом тропических фруктов: манго, ананас, гибискус и цветы апельсинового дерева",
                  id: 109,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/406/nau11oukju2k4p77pkrj3fcuuycwk17f/large.png",
                      price: 105,
                      size: "Большой",
                      item_id: 109,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "Бургеры и роллы",
          id: 8,
          types: [
            {
              title: "Курица",
              category_id: 8,
              id: 15,
              items: [
                {
                  title: "Бургер арбатский с курицей",
                  description:
                    "Бургер с сочной куриной котлетой в хрустящей панировке, ломтиком томата, свежим салатом, нежным сыром, яркой ноткой копченой индейки, уникальным соусом с ароматом малосольных огурчиков, и всё это на горячей, ржаной булочке с глазурью и гречневой посыпкой.",
                  id: 56,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/fcd/lpkdjr5rwu79fjl7mzklnrmzg1a29nho/large.png",
                      price: 245,
                      size: "253 г",
                      item_id: 56,
                    },
                  ],
                },
                {
                  title: "Биг чикен бургер",
                  description:
                    "Большой бургер с нежным филе куриной грудки в хрустящей панировке, сыром Эмменталь, сочными ломтиками помидора, свежим салатом и специальным соусом на булочке с кунжутом",
                  id: 57,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/1b5/7rad86le7h0opxq3kfw8jt9pofmkunbp/large.png",
                      price: 272,
                      size: "323 г",
                      item_id: 57,
                    },
                  ],
                },
                {
                  title: "Чикен премьер",
                  description:
                    "Сочная куриная котлета в хрустящей панировке, сыр Чеддер, ароматный бекон, ломтик помидора, свежий салат, специальный соус и булочка с кунжутом",
                  id: 59,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/bcd/qjomd5lxk8ng7crbh5b2sj3on607jfig/large.png",
                      price: 173,
                      size: "234 г",
                      item_id: 59,
                    },
                  ],
                },
                {
                  title: "Чикен хит",
                  description:
                    "Сочная куриная котлета в хрустящей панировке, салат Айсберг, специальный соус и карамелизированная булочка с кунжутом",
                  id: 60,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/60f/6hsy7tzloe868vqyem25xtf9kh3r56fn/large.png",
                      price: 114,
                      size: "198 г",
                      item_id: 60,
                    },
                  ],
                },
                {
                  title: "Чикенбургер",
                  description:
                    "Обжаренная куриная котлета из сочного куриного мяса, панированная в сухарях, которая подается на карамелизованной булочке, заправленной свежим салатом и специальным соусом",
                  id: 61,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/8ad/1nahkiz2eeqsg2oisgzju2t0xre7lbac/large.png",
                      price: 62,
                      size: "129 г",
                      item_id: 61,
                    },
                  ],
                },
              ],
            },
            {
              title: "Говядина",
              category_id: 8,
              id: 16,
              items: [
                {
                  title: "Бургер арбатский",
                  description:
                    "Бургер с сочным бифштексом из натуральной говядины на гриле, томатом, свежим салатом, нежным сыром, ломтиком копчёной индейки, уникальным соусом с ароматом малосольных огурчиков, и всё это на горячей, ржаной булочке с глазурью и гречневой посыпкой.",
                  id: 8,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/6e6/dluh0zpxtrqeo4e51vf6usq8ok31tmk3/large.png",
                      price: 279,
                      size: "247 г",
                      item_id: 8,
                    },
                  ],
                },
                {
                  title: "Биг спешиал демиглас",
                  description:
                    "Неповторимый бургер с большим рубленым бифштексом из 100% отборной говядины на большой булочке с кунжутом. Внутри свежие овощи, сыр Эмменталь, кусочки жареного хрустящего лука, соус с дымком и соус Демиглас на основе ароматного бульона из говяжьей косточки",
                  id: 9,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/f12/zcdgmhqiigoxj2j06l2schtbupxyc5bm/large.png",
                      price: 325,
                      size: "348 г",
                      item_id: 9,
                    },
                  ],
                },
                {
                  title: "Двойной биг спешиал демиглас",
                  description:
                    "Неповторимый бургер с двумя большими рублеными бифштексами из 100% отборной говядины на булочке с кунжутом. Внутри свежие овощи, сыр Эмменталь, кусочки жареного хрустящего лука, соус с дымком и соус Демиглас на основе ароматного бульона из говяжьей косточки",
                  id: 44,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/dc0/krpo60sj0btvsvhypce6suxtlzy96ply/large.png",
                      price: 445,
                      size: "458 г",
                      item_id: 44,
                    },
                  ],
                },
                {
                  title: "Биг хит",
                  description:
                    "Легендарный бургер с двумя рублеными бифштексами из 100% говядины, маринованными огурчиками, свежим салатом «Айсберг», ломтиком плавленого сыра Чеддер и специальным соусом «Биг Хит» на новой булочке с двумя видами кунжута",
                  id: 45,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/293/n16k6vmjoqft5b1ae5vb6v91b7odpq4l/large.png",
                      price: 186,
                      size: "228 г",
                      item_id: 45,
                    },
                  ],
                },
                {
                  title: "Двойной биг хит",
                  description:
                    "Большой бургер с четырьмя рублеными бифштексами из 100% говядины, маринованными огурчиками, свежим салатом «Айсберг», ломтиком плавленого сыра Чеддер и специальным соусом «Биг Хит» на новой булочке с двумя видами кунжута",
                  id: 46,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/25a/l7c1js5bpl1oido33em5qdhk4xva548w/large.png",
                      price: 248,
                      size: "303 г",
                      item_id: 46,
                    },
                  ],
                },
                {
                  title: "Гранд",
                  description:
                    "Сочный бифштекс из натуральной говядины, приготовленный на гриле, карамелизованная булочка с кунжутом, два ломтика сыра Чеддер, кетчуп, горчица, свежий лук и маринованные огурчики",
                  id: 47,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/c63/9g9kd2xa57m1e6naepjsa4sk1jsdgzlp/large.png",
                      price: 193,
                      size: "202 г",
                      item_id: 47,
                    },
                  ],
                },
                {
                  title: "Гранд де люкс",
                  description:
                    "Сочный бифштекс из натуральной говядины, приготовленный на гриле, карамелизованная булочка с кунжутом, два ломтика сыра Чеддер, свежий салат, кусочек помидора и лук, маринованные огурчики, кетчуп, горчица и специальный соус",
                  id: 48,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/7b4/v8evc1skyximb0dl8k9cfoo03y5qkbwu/large.png",
                      price: 219,
                      size: "251 г",
                      item_id: 48,
                    },
                  ],
                },
                {
                  title: "Двойной гранд",
                  description:
                    "Два сочных бифштекса из натуральной говядины, приготовленных на гриле, карамелизованная булочка с кунжутом, два ломтика сыра Чеддер, лук, маринованные огурчики, кетчуп и горчица",
                  id: 49,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/141/luttceth2zsxgndy1mnz0bquu3q1a4w7/large.png",
                      price: 285,
                      size: "282 г",
                      item_id: 49,
                    },
                  ],
                },
                {
                  title: "Двойной биг спешиал",
                  description:
                    "Тот самый Бургер с двумя большими рублеными бифштексами из 100% говядины на булочке с кунжутом. Особенный вкус бургеру придает специальный соус с дымком, 3 кусочка сыра Эмменталь, ломтик помидора, свежий салат и лук",
                  id: 50,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/053/x9h1eum91b6genrndx446gmq7br6ou6s/large.png",
                      price: 397,
                      size: "450 г",
                      item_id: 50,
                    },
                  ],
                },
                {
                  title: "Биг спешиал",
                  description:
                    "Это неповторимый сандвич с большим рубленым бифштексом из 100% отборной говядины на большой булочке с кунжутом. Особенный вкус сандвичу придают три кусочка сыра Эмменталь, два ломтика помидора, свежий салат, лук и соус с дымком.",
                  id: 51,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/e98/epz1mqwqe0yj2aky9i1tajlpdy9j7k2x/large.png",
                      price: 299,
                      size: "340 г",
                      item_id: 51,
                    },
                  ],
                },
                {
                  title: "Биг спешиал джуниор",
                  description:
                    "Бургер с рубленым бифштексом из 100% говядины на булочке с кунжутом, два кусочка сыра Эмменталь, свежий салат, лук, ломтик помидора и специальный соус с дымком",
                  id: 52,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/0d8/rfyot0v6repbw8h6bv39tca3y1u7fp06/large.png",
                      price: 259,
                      size: "231 г",
                      item_id: 52,
                    },
                  ],
                },
                {
                  title: "Двойной чизбургер",
                  description:
                    "Два рубленых бифштекса из натуральной цельной говядины с двумя кусочками сыра Чеддер на карамелизованной булочке, заправленной горчицей, кетчупом, луком и двумя кусочками маринованного огурчика",
                  id: 53,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/49e/41s17f0c17czkqxbtskvb4f0c3io3byr/large.png",
                      price: 160,
                      size: "173 г",
                      item_id: 53,
                    },
                  ],
                },
                {
                  title: "Чизбургер",
                  description:
                    "Рубленый бифштекс из натуральной цельной говядины с кусочками сыра Чеддер на карамелизованной булочке, заправленной горчицей, кетчупом, луком и кусочком маринованного огурчика",
                  id: 54,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/60e/3vx8erpxn4nk3qhjh5k5ufh5jye60k12/large.png",
                      price: 78,
                      size: "117 г",
                      item_id: 54,
                    },
                  ],
                },
                {
                  title: "Гамбургер",
                  description:
                    "Рубленый бифштекс из натуральной цельной говядины на карамелизованной булочке, заправленной горчицей, кетчупом, луком и кусочком маринованного огурчика",
                  id: 55,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/5b2/is6dg0nuc8feyomg3c71gvbza4ovqm8j/large.png",
                      price: 65,
                      size: "103 г",
                      item_id: 55,
                    },
                  ],
                },
              ],
            },
            {
              title: "Роллы",
              category_id: 8,
              id: 17,
              items: [
                {
                  title: "Биг спешиал демиглас ролл",
                  description:
                    "Два сочных бифштекса из 100% говядины, свежие овощи, сыр Эмменталь, кусочки жареного хрустящего лука, заправленные соусом с дымком и соусом Демиглас на основе ароматного бульона из говяжьей косточки и завёрнутые в пшеничную лепешку",
                  id: 64,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/22a/lis43yax6qf18o7qqhw9d3ltogjxggrs/large.png",
                      price: 275,
                      size: "262 г",
                      item_id: 64,
                    },
                  ],
                },
                {
                  title: "Цезарь ролл",
                  description:
                    "100% белое куриное мясо в хрустящей панировке, ломтик помидора, листья салата и ломтики твёрдого сыра, заправленные специальным соусом и завёрнутые в пшеничную лепешку",
                  id: 65,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/7ee/q7jmx0e5refvg5ngefh26x8pyrqy0xl2/large.png",
                      price: 190,
                      size: "211 г",
                      item_id: 65,
                    },
                  ],
                },
                {
                  title: "Шримп ролл",
                  description:
                    "Нежные креветки в хрустящей панировке, свежий салат Айсберг и лук в пшеничной лепешке, заправленной специальным соусом.",
                  id: 66,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/c9d/9kfmo7o164gj8hg4x0zdu5yleh3hk54b/large.png",
                      price: 252,
                      size: "171 г",
                      item_id: 66,
                    },
                  ],
                },
                {
                  title: "Биг спешиал ролл",
                  description:
                    "Два сочных бифштекса из 100% говядины, свежие овощи, сыр, специальный соус с дымком и все это в пшеничной лепешке",
                  id: 67,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/6d9/v2iairpjs2649aqde8td70jq5tiq4gxu/large.png",
                      price: 230,
                      size: "241 г",
                      item_id: 67,
                    },
                  ],
                },
              ],
            },
            {
              title: "Рыба",
              category_id: 8,
              id: 18,
              items: [
                {
                  title: "Фиш бургер",
                  description:
                    "Филе хорошо прожаренной рыбы (семейства тресковых), которое подается на пропаренной булочке с половинкой кусочка сыра Чеддер, заправленной специальным соусом Тар-Тар",
                  id: 62,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/915/2j7yujj6aj1o4t8g6g4hed98z9avadkr/large.png",
                      price: 204,
                      size: "133 г",
                      item_id: 62,
                    },
                  ],
                },
                {
                  title: "Двойной фиш бургер",
                  description:
                    "Два кусочка филе рыбы (семейство тресковых), которые подаются на пышной пропаренной булочке с кусочком сыра Чеддер. Бургер заправлен соусом Тар-Тар",
                  id: 63,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/807/2oor642w23vv1epwb2yxqhu96k87h5xn/large.png",
                      price: 259,
                      size: "196 г",
                      item_id: 63,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "Разное",
          id: 9,
          types: [
            {
              title: "default",
              category_id: 9,
              id: 3,
              items: [
                {
                  title: "Сырный соус + кисло-сладкий соус",
                  description:
                    "Выгодная пара самых популярных соусов во «Вкусно — и точка». Нежнейший сырный соус, который тает во рту, и пикантный кисло-сладкий соус, балансирующий вкус любого блюда.",
                  id: 121,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/ee0/a34s5lv017wcg2ji6yx8wgcaj53bnoim/large.png",
                      price: 85,
                      size: "50 мл",
                      item_id: 121,
                    },
                  ],
                },
                {
                  title: "Соус томатный острый «чипотл»",
                  description:
                    "Остро-сладкий томатный соус Чипотл PIKADOR с перцем специально для любителей остренького. Пряный соус отлично подойдет для хрустящей картошки, наггетсов, стрипсов и даже креветок и разнообразит их вкус.",
                  id: 122,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/571/vliyd9pmb1x2gcjtqztk05gs65euuoka/large.png",
                      price: 45,
                      size: "25 г",
                      item_id: 122,
                    },
                  ],
                },
                {
                  title: "Сырный соус + сырный соус",
                  description:
                    "Выгодная пара сырных соусов с насыщенным сливочным вкусом, которые так и тают во рту. Ведь сыра много не бывает.",
                  id: 123,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/59b/b7zingccpivu5pcyt5vtawtu8fujey27/large.png",
                      price: 85,
                      size: "50 мл",
                      item_id: 123,
                    },
                  ],
                },
                {
                  title: "Кисло-сладкий соус + кисло-сладкий соус",
                  description:
                    "Выгодная пара кисло-сладких соусов, которые гармонично сочетают в себе освежающую кислинку и почти медовую сладость. Для тех, кто любит делиться.",
                  id: 124,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/35c/u1fdrj0e5dozb9gce9w6vq1v0lk7huhu/large.png",
                      price: 85,
                      size: "50 мл",
                      item_id: 124,
                    },
                  ],
                },
                {
                  title: "Соус сырный",
                  description:
                    "Нежнейший сырный соус с кремовой бархатистой текстурой, моментально тающей во рту. Его вкус насыщенный, сливочный, с ярко выраженным сырным акцентом.",
                  id: 125,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/eb7/p3jixcedeyefwgqrqxhzfzl0ldhcsusc/large.png",
                      price: 45,
                      size: "25 мл",
                      item_id: 125,
                    },
                  ],
                },
                {
                  title: "Соус кисло-сладкий",
                  description:
                    "Кисло-сладкий соус — это универсальный соус, сочетающий в себе освежающую кислинку и лёгкую сладость. Этот соус сделает любое блюдо пикантным и ещё более аппетитным.",
                  id: 126,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/9cf/dmm5z5npm6z1y7xa7szc4obpzn0iafrx/large.png",
                      price: 45,
                      size: "25 мл",
                      item_id: 126,
                    },
                  ],
                },
                {
                  title: "Соус 1000 островов",
                  description:
                    "Насыщенный сливочно-томатный соус с кремовой консистенцией. Его сладковатый вкус с легкой кислинкой и пряным ароматом идеально дополнит вкус креветок.",
                  id: 127,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/eb5/3wze880q8o6503qq3wgbbpm3r1z7q5vf/large.png",
                      price: 45,
                      size: "25 мл",
                      item_id: 127,
                    },
                  ],
                },
                {
                  title: "Соус чесночный",
                  description:
                    "Пикантный соус с нежным сливочно-чесночным вкусом на основе растительных масел и чеснока.",
                  id: 128,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/fe7/wsnab2fuka0mert9w092ke72wrf8jawz/large.png",
                      price: 45,
                      size: "25 мл",
                      item_id: 128,
                    },
                  ],
                },
                {
                  title: "Соус горчичный",
                  description:
                    "Пикантный соус с неповторимым ароматом и богатым вкусом. Не слишком жгучий, но точно придаст любому блюду насыщенный вкус и согревающую остринку.",
                  id: 129,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/25a/2olssg516vxphud2pdul1uynxq94g5us/large.png",
                      price: 45,
                      size: "25 мл",
                      item_id: 129,
                    },
                  ],
                },
                {
                  title: "Кетчуп",
                  description:
                    "Классический томатный кетчуп — обладает ярким и насыщенным вкусом, сочетающим в себе сладость и кислинку.",
                  id: 130,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/dce/kwxjf91yz5inr6crfnvl2jtxbxirg18j/large.png",
                      price: 45,
                      size: "25 мл",
                      item_id: 130,
                    },
                  ],
                },
                {
                  title: "Соус сладкий чили",
                  description:
                    "Классический соус тайской кухни с добавлением остренького перчика. Острый и в то же время сладкий.",
                  id: 131,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/158/oci0ucjl0fynxr1mqg1xa334bo9per38/large.png",
                      price: 45,
                      size: "25 мл",
                      item_id: 131,
                    },
                  ],
                },
                {
                  title: "Соус барбекю",
                  description:
                    "Соус барбекю с пряными специями. Для любителей сладковато-острого вкуса с нотками копчёности.",
                  id: 132,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/217/0im0uoxz9k2ue7i8xowrd5zv0qfuyrfd/large.png",
                      price: 45,
                      size: "25 мл",
                      item_id: 132,
                    },
                  ],
                },
                {
                  title: "Соус цезарь",
                  description:
                    "Классическая заправка с нежной консистенцией. Этот насыщенный соус с нотками сыра, чеснока и горчицы придаст пикантности любому блюду.",
                  id: 133,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/add/ahfacgw4djaxv76lnn078u9qopi8zgf7/large.png",
                      price: 40,
                      size: "25 мл",
                      item_id: 133,
                    },
                  ],
                },
                {
                  title: "Оливковое масло",
                  description:
                    "Заправка «Оливковое масло» — это натуральное оливковое масло высшей категории со свежим ароматом и гармоничным вкусом. Идеально дополнит вкус салатов.",
                  id: 134,
                  sizes: [
                    {
                      image:
                        "https://vkusnoitochka.ru/resize/194x194/upload/iblock/8b3/n5be872gtmgltpzkmeng7c2enpdbusic/large.png",
                      price: 40,
                      size: "10 мл",
                      item_id: 134,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ]);
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemOpened, setItemOpened] = useState({
    id: "id",
    title: "title",
    sizes: [{ item_id: "id", image: "image", price: "price", size: "size" }],
    decription: "description",
  });

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const onItemClick = (item) => {
    setIsModalOpen(true);
    setItemOpened(item);
  };

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
              <Category category={category} onItemClick={onItemClick} />
            </div>
          ))}
        </>
      )}
      {isModalOpen && (
        <ItemModal
          isOpen={isModalOpen}
          onClose={onModalClose}
          item={itemOpened}
        />
      )}
    </>
  );
}
