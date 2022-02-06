import type { NextPage } from "next";
import NFTCard from "../../components/NFTCard";
import Title from "../../components/Title";

const Market: NextPage = () => {
  return (
    <>
      <Title>Market</Title>
      <h1>Market</h1>
      <NFTCard artId={1} price={2}></NFTCard>
    </>
  );
};

export default Market;
