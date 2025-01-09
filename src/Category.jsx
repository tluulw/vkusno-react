import { useState } from "react";
import Type from "./Type";
import TypesPanel from "./TypesPanel";

export default function Category({ category }) {
  const [types, setTypes] = useState(category.types);

  function changeTypes(typeTitle) {
    if (typeTitle == "Все") {
      setTypes(category.types);
    } else {
      const tip = category.types.find((type) => type.title === typeTitle);
      setTypes([tip]);
    }
  }

  return (
    <>
      <h1>{category.title}</h1>
      <TypesPanel
        types={[{ title: "Все", id: 0 }, ...category.types]}
        onClick={changeTypes}
      />
      {types.map((type) => (
        <Type key={type.id} items={type.items} />
      ))}
    </>
  );
}
