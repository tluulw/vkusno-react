import { styled } from "styled-components";
import banner from "/banner.jpg";

const BannerContainer = styled.div`
  margin: 1rem;
`;

export default function Banner() {
  return (
    <BannerContainer>
      <img src={banner} style={{ width: "100%" }} />
    </BannerContainer>
  );
}
