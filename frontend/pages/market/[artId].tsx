import type { NextPage } from "next";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import Title from "../../components/Title";
import * as KlipAPI from "../../api/useKlip";
import QRCode from "qrcode.react";
import { useAppSelector } from "../../settings/hooks";
import styled from "styled-components";

const PriceContainer = styled.div`
  padding: 12px;
  border: 1px solid gray;
  display: inline-block;
  border-radius: 5px;
  min-width: 320px;
  text-align: center;

  div {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 5px;
  }

  button {
    background-color: black;
    color: white;
    border-radius: 3px;
    border: 0;
    display: block;
    padding: 10px;
    width: 100%;
    cursor: pointer;
  }
`;

const Price = styled.div`
  font-weight: bold;
  font-size: 2rem;
  color: black;
`;

const PriceLabel = styled.div`
  color: gray;
  height: 20px;
`;

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

  return (
    <>
      <Title>{artId}</Title>
      <h1>Art {artId}</h1>
      <PriceContainer>
        <div>
          <PriceLabel>판매가</PriceLabel>
          <Price>0.01 KLAY</Price>
        </div>
        <button onClick={BuyCard}>구매하기</button>
        {qrvalue !== "DEFAULT" ? <QRCode value={qrvalue} /> : null}
      </PriceContainer>
    </>
  );
};

export default Art;
