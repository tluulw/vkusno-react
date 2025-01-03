import Banner from "./Banner";
import Header from "./Header/Header";
import CategoriesPanel from "./CategoriesPanel";

export default function App() {
  return (
    <>
      <Header />
      <Banner />
      <div>Наше меню</div>
      <CategoriesPanel />
    </>
  );
}
