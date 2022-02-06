import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { fetchCardsOf } from "../../api/useCaver";
import CollectionCard from "../../components/CollectionCard";
import NFTCard from "../../components/NFTCard";
import Title from "../../components/Title";
import { useAppDispatch, useAppSelector, useInput } from "../../settings/hooks";

// 로그인 된 유저의 콜렉션
const UserCollection: NextPage = () => {
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const userAddress = "0x2bc2C46165b64A3AF6A257B9fF882A1f7BeBc327"; //임시 주소

  const [nfts, setNfts] = useState([
    {
      id: 0,
      uri: "",
    },
  ]);

  const fetchMyNFTs = async () => {
    const _nfts = await fetchCardsOf(userAddress);
    setNfts(_nfts);
  };

  useEffect(() => {
    fetchMyNFTs();
  }, []);

  return (
    <>
      <Title>콜렉션</Title>
      <h1>콜렉션</h1>

      {nfts.map((nft, index) => (
        <CollectionCard artId={nft.id} uri={nft.uri}></CollectionCard>
      ))}
    </>
  );
};

export default UserCollection;
