import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { fetchCardsOf } from "../../api/useCaver";
import NFTCard from "../../components/NFTCard";
import Title from "../../components/Title";

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
      <h1>Market</h1>
      {nfts.map((nft, index) => (
        <NFTCard
          key={`NFT${nft.id}`}
          artId={nft.id}
          uri={nft.uri}
          price={0.01}
        ></NFTCard>
      ))}
    </>
  );
};

export default Market;
