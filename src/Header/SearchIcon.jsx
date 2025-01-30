import { styled } from "styled-components";

const SearchIconContainer = styled.svg`
  width: 24px;
  height: 24px;
`;

export default function SearchIcon(props) {
  return (
    <SearchIconContainer
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2c365e"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </SearchIconContainer>
  );
}
