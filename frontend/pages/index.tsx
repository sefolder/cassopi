import type { NextPage } from "next";
import Title from "../components/Title";
import styled from "styled-components";

const BannerContainer = styled.div`
  //box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 100%;
  align-items: center;
`;

const Banner = styled.img`
  transition: 0.3s;
  width: 100%;
  align-items: center;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const Home: NextPage = () => {
  const BannerURL =
    "https://image.freepik.com/free-vector/abstract-dotted-banner-background_1035-18160.jpg"; //temporary
  const eventURL = "https://forms.gle/L5AerRzfDMzDfZfbA";

  return (
    <>
      <Title>홈</Title>
      <BannerContainer>
        <a href={eventURL} target="_blank" rel="noreferrer">
          <Banner src={BannerURL} />
        </a>
      </BannerContainer>
      <h1>홈</h1>
    </>
  );
};

export default Home;
