import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Title from "../../components/Title";
import * as KlipAPI from "../../api/useKlip";
import QRCode from "qrcode.react";

const Art: NextPage = () => {
  /*
  const [qrvalue, setQrvalue] = useState("DEFAULT");

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
  const {
    query: { artId },
  } = useRouter();
  return (
    <>
      <Title>{artId}</Title>
      <h1>Art {artId}</h1>
      {/* <button onClick={onClickMint}>발행</button>
      <QRCode value={qrvalue} /> */}
    </>
  );
};

export default Art;
