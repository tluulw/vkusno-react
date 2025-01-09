import { styled } from "styled-components";

const Button = styled.button`
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
  background-color: #2c365e;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  white-space: nowrap; /* Текст не переносится */
  transition: background-color 0.3s;

  &:hover {
    background-color: #1f294a;
  }

  &.active {
    background-color: #007bff;
  }
`;

export default function CategoryButton({ children, isActive, onClick }) {
  return (
    <Button
      className={isActive ? "active" : ""}
      onClick={() => onClick(children.id)}
    >
      {children.title}
    </Button>
  );
}
