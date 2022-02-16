import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import Title from "../components/Title";
import Link from "next/link";
import styled from "styled-components";
import { fetchCardsOf } from "../api/useCaver";
import CollectionCard from "../components/CollectionCard";
import NFTCard from "../components/NFTCard";

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

const Bigtxt = styled.div`
  font-size: 40px;
  font-weight: bold;
`;

const Square = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 10%;
  background-color: lightgrey;
  cursor: pointer;
`;

const NFT1Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr 1fr;
  /* grid-column: 1 / 3;
  grid-row: 1 / 3; */
  grid-gap: 20px;
  //background-color: #8592929e;
`;

const NFT2Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(250px, auto);
  //background-color: #8592929e;
`;

const CardImage = styled(Image)`
  border-radius: 10px;
`;

interface Imetadata {
  name: string;
  description: string;
  attributes: any;
}
interface Infts {
  id: number;
  image: string;
  metadata: Imetadata;
}

const Home: NextPage = () => {
  const BannerURL =
    //"https://image.freepik.com/free-vector/abstract-dotted-banner-background_1035-18160.jpg"; //temporary
    "/home_banner_cropped.png";
  const eventURL = "https://forms.gle/L5AerRzfDMzDfZfbA";

  //인기 NFT
  const [nfts1, setNfts1] = useState([
    {
      id: 0,
      uri: "",
    },
  ]);

  //최근 올라온 NFT 리스트
  const [nfts2, setNfts2] = useState<Infts[]>([
    {
      id: 1,
      image: "",
      metadata: {
        name: "",
        description: "",
        attributes: [],
      },
    },
  ]);

  const fetchMarketNFTs = async () => {
    const _nfts = await fetchCardsOf(process.env.NEXT_PUBLIC_MARKET_CONTRACT);

    for (let i = 0; i < _nfts.length; i++) {
      _nfts[i].id = Number(_nfts[i].id);
    }

    console.log("_nfts is ", _nfts);
    setNfts2(_nfts);
  };

  useEffect(() => {
    fetchMarketNFTs();
  }, []);

  return (
    <>
      <Title>홈</Title>
      <BannerContainer>
        <a href={eventURL} target="_blank" rel="noreferrer">
          <Banner src={BannerURL} />
        </a>
      </BannerContainer>
      <br />
      <br />
      <Bigtxt>이번달 주목할 NFT</Bigtxt> <br />
      <NFT1Container>
        <Square
          style={{
            width: "340px",
            height: "340px",
            overflow: "hidden",
            gridColumn: "1 / 3",
            gridRow: "1 / 3",
          }}
        >
          <CardImage
            src="rnj9.jpg"
            alt="artId"
            width={340}
            height={340}
            objectFit="cover"
          />
        </Square>
        <Square style={{ overflow: "hidden" }}>
          <CardImage
            src="lsh3.jpg"
            alt="artId"
            width={160}
            height={160}
            objectFit="cover"
          />
        </Square>
        <Square style={{ overflow: "hidden" }}>
          <CardImage
            src="lsh5.jpg"
            alt="artId"
            width={160}
            height={160}
            objectFit="cover"
          />
        </Square>
        <Square style={{ overflow: "hidden" }}>
          <CardImage
            src="lsh4.jpeg"
            alt="artId"
            width={160}
            height={160}
            objectFit="cover"
          />
        </Square>
        <Square style={{ overflow: "hidden" }}>
          <CardImage
            src="rnj6.jpg"
            alt="artId"
            width={160}
            height={160}
            objectFit="cover"
          />
        </Square>
        <Square style={{ overflow: "hidden" }}>
          <CardImage
            src="rnj7.jpg"
            alt="artId"
            width={160}
            height={160}
            objectFit="cover"
          />
        </Square>
        <Square style={{ overflow: "hidden" }}>
          <CardImage
            src="yjm1.jpg"
            alt="artId"
            width={160}
            height={160}
            objectFit="cover"
          />
        </Square>
        <Square style={{ overflow: "hidden" }}>
          <CardImage
            src="hrw1.jpg"
            alt="artId"
            width={160}
            height={160}
            objectFit="cover"
          />
        </Square>
        <Square style={{ overflow: "hidden" }}>
          <CardImage
            src="syb2.jpg"
            alt="artId"
            width={160}
            height={160}
            objectFit="cover"
          />
        </Square>
      </NFT1Container>
      <br />
      <br />
      <br />
      <Bigtxt>최근 올라온 NFT</Bigtxt> <br />
      <NFT2Container>
        {nfts2
          .slice(0)
          .reverse()
          .map(
            (nft, index) =>
              nft.image.length > 0 && (
                <NFTCard
                  key={`NFT${nft.id}`}
                  price={0.01}
                  nftInfo={nft}
                ></NFTCard>
              )
          )}
      </NFT2Container>
    </>
  );
};

export default Home;
