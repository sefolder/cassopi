import type { NextPage } from "next";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import Title from "../../components/Title";
import * as KlipAPI from "../../api/useKlip";
import QRCode from "qrcode.react";
import { useAppSelector } from "../../settings/hooks";

const Art: NextPage = () => {
  const {
    query: { artId },
  } = useRouter();

  const isLogin = useAppSelector((state) => state.user.isLogin);
  const userAddress = useAppSelector((state) => state.user.userAddress);
  const userBalance = useAppSelector((state) => state.user.userBalance);
  const [qrvalue, setQrvalue] = useState("DEFAULT");

  const BuyCard = () => {
    KlipAPI.buyCard(
      parseInt(artId as string),
      10 ** 16, //1 KLAY = 10 ** 18 pem
      setQrvalue,
      (result) => {
        alert(JSON.stringify(result));
      }
    );
  };
  /*
  

  const onClickMint = async () => {
    const randomTokenId = Math.round(Math.random() * 10000000);
    KlipAPI.mintCardWithURI(
      "0x2bc2C46165b64A3AF6A257B9fF882A1f7BeBc327",
      1,
      "https://cdn.pixabay.com/photo/2021/12/17/06/18/cat-6875746__340.jpg",
      setQrvalue,
      (result) => {
        alert(JSON.stringify(result));
      }
    );
  };
  */

  return (
    <>
      <Title>{artId}</Title>
      <h1>Art {artId}</h1>
      {userAddress}
      <br />
      <button onClick={BuyCard}>구매하기</button>
      {qrvalue !== "DEFAULT" ? <QRCode value={qrvalue} /> : null}

      {/* <button onClick={onClickMint}>발행</button>
       */}
    </>
  );
};

export default Art;
