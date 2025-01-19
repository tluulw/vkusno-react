import { styled } from "styled-components";

const ItemContainer = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 35%;
  margin: 0.5rem;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 10rem;
  object-fit: contain;
  margin-bottom: 0.5rem;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #000000;
  margin: 0;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

const Price = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
`;

const AddButton = styled.button`
  background-color: #2c365e;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;

  &:hover {
    background-color: #1b254b;
  }
`;

export default function Item({ item, onItemClick }) {
  const itemSize = item.sizes[0];
  return (
    <ItemContainer onClick={() => onItemClick(item)}>
      <Image src={itemSize.image} alt={item.title} />
      <Title>{item.title}</Title>
      <InfoRow>
        <Price>от {itemSize.price} ₽</Price>
        <AddButton onClick={() => onItemClick(item)}>+</AddButton>
      </InfoRow>
    </ItemContainer>
  );
}
