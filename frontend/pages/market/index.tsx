import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchCardsOf } from "../../api/useCaver";
import NFTCard from "../../components/NFTCard";
import Title from "../../components/Title";

const SideContainer = styled.div`
  width: 250px;
  position: fixed;
`;

const SideH1 = styled.h1`
  font-size: 40px;
  font-weight: 700;
  line-height: 1.25;
`;

const NFTsContainer = styled.div`
  margin-left: 270px;
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
    <>
      <Title>Market</Title>
      <SideContainer>
        <SideH1>Dreaming Marketplace</SideH1>
      </SideContainer>
      <NFTsContainer>
        {nfts.map(
          (nft) =>
            nft.uri.length > 0 && (
              <NFTCard
                key={`NFT${nft.id}`}
                artId={nft.id}
                uri={nft.uri}
                price={0.01}
              ></NFTCard>
            )
        )}
      </NFTsContainer>
    </>
  );
};

export default Market;
