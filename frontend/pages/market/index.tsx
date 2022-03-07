import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchCardsOf } from "../../api/useCaver";
import NFTCard from "../../components/NFTCard";
import Title from "../../components/Title";

const SideContainer = styled.div`
  width: 250px;
  position: fixed;

  @media (max-width: 860px) {
    width: 100%;
    position: static;
  }
`;

const SideH1 = styled.h1`
  font-size: 40px;
  font-weight: 700;
  line-height: 1.25;
`;

const NFTsContainer = styled.div`
  margin-left: 270px;

  @media (max-width: 860px) {
    margin-left: 0;
  }
`;

const Container = styled.div`
  width: 100%;

  h1 {
    margin-top: 20px;
    font-size: 2rem;
    font-weight: bold;
  }

  @media (max-width: 860px) {
    display: block;
  }
`;

const NFTContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(250px, auto);
  height: 100%;

  @media (max-width: 1080px) {

  }
  @media (max-width: 860px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
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

const Market: NextPage = () => {
  const [nfts, setNfts] = useState<Infts[]>([
    {
      id: 0,
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
    setNfts(_nfts);
  };

  useEffect(() => {
    fetchMarketNFTs();
  }, []);

  return (
    <Container>
      <Title>Market</Title>
      <SideContainer>
        <SideH1>Dreaming Marketplace</SideH1>
      </SideContainer>
      <NFTsContainer>
        <NFTContainer>
          {nfts.map(
            (nft, index) =>
              nft.image.length > 0 && (
                <NFTCard key={`NFT${nft.id}`} price={3} nftInfo={nft}></NFTCard>
              )
          )}
        </NFTContainer>
      </NFTsContainer>
    </Container>
  );
};

export default Market;
