import { styled } from "styled-components";
import Item from "./Item";

const TypeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export default function Type({ items, onItemClick }) {
  return (
    <>
      <TypeContainer>
        {items.map((item) => (
          <Item key={item.id} item={item} onItemClick={onItemClick} />
        ))}
      </TypeContainer>
    </>
  );
}
