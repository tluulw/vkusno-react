import { styled } from "styled-components";
import banner from "/banner.jpg";
import "./Banner.css";

const BannerContainer = styled.div`
  margin: 1rem;
`;

export default function Banner() {
  return (
    <BannerContainer>
      <img src={banner} className="banner" />
    </BannerContainer>
  );
}
