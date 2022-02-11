import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchCardsOf } from "../../api/useCaver";
import NFTCard from "../../components/NFTCard";
import Title from "../../components/Title";

const Container = styled.div`
  h1 {
    margin-top: 20px;
    font-size: 2rem;
    font-weight: bold;
  }
`;

const NFTContainer = styled.div`
  display: flex;
`;

const Market: NextPage = () => {
  const [nfts, setNfts] = useState([
    {
      id: 0,
      uri: "",
    },
  ]);

  const fetchMarketNFTs = async () => {
    const _nfts = await fetchCardsOf(process.env.NEXT_PUBLIC_MARKET_CONTRACT);
    setNfts(_nfts);
  };

  useEffect(() => {
    fetchMarketNFTs();
  }, []);

  return (
    <Container>
      <Title>Market</Title>
      <h1>구매 가능한 NFT</h1>
      <NFTContainer>
        {nfts.map(
          (nft, index) =>
            nft.uri.length > 0 && (
              <NFTCard
                key={`NFT${nft.id}`}
                artId={nft.id}
                uri={nft.uri}
                price={0.01}
              ></NFTCard>
            )
        )}
      </NFTContainer>
    </Container>
  );
};

export default Market;
