import { styled } from "styled-components";
import Logo from "./Logo";
import SearchIcon from "./SearchIcon";
import CartIcon from "./CartIcon";

const HeaderContainer = styled.header`
  top: 0;
  left: 0;
  position: fixed;
  z-index: 555;
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: space-between;
  height: 50px;
  background-color: #2c365e;
  font-size: medium;
  font-weight: 500;
  color: white;
`;

const IconButton = styled.button`
  color: white;
  margin: 0.7rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.3s;

  &:hover {
    color: #007bff;
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      <IconButton>
        <SearchIcon />
      </IconButton>
      <IconButton
        onClick={() =>
          // при нажатии на лого мотаемся на самый верх
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      >
        <Logo />
      </IconButton>
      <IconButton>
        <CartIcon />
      </IconButton>
    </HeaderContainer>
  );
}
