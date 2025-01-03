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
  margin: 1rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: #d5dcf9;
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      <IconButton>
        <SearchIcon />
      </IconButton>
      <IconButton>
        <Logo />
      </IconButton>
      <IconButton>
        <CartIcon />
      </IconButton>
    </HeaderContainer>
  );
}
