import { styled } from "styled-components";
import Logo from "./Logo";
import SearchIcon from "./SearchIcon";
import CartIcon from "./CartIcon";
import { useCart } from "../Cart/CartContext";

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
    opacity: 0.8;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ee7203;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(50%, -50%);
  pointer-events: none;
`;

const CartContainer = styled.div`
  position: relative; /* Для позиционирования бейджа */
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Header({ onLogoClick, onCartClick }) {
  const { cartItems } = useCart();
  return (
    <HeaderContainer>
      <IconButton>
        <SearchIcon />
      </IconButton>
      <IconButton onClick={() => onLogoClick(0)}>
        <Logo />
      </IconButton>
      <IconButton onClick={onCartClick}>
        <CartContainer>
          <CartIcon visible={cartItems.length > 0} />
          {cartItems.length > 0 && <Badge>{cartItems.length}</Badge>}
        </CartContainer>
      </IconButton>
    </HeaderContainer>
  );
}
