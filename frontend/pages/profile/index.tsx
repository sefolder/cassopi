import type { NextPage } from "next";
import { title } from "process";
import { useEffect, useState } from "react";
import { fetchCardsOf } from "../../api/useCaver";
import { displayCard } from "../../api/useKlip";
import CollectionCard from "../../components/CollectionCard";
import Modal from "../../components/Modal";
import Title from "../../components/Title";
import QRCode from "qrcode.react";
import { useAppDispatch, useAppSelector, useInput } from "../../settings/hooks";
import styled from "styled-components";
import Image from "next/image";

const Container = styled.div`
  display: flex;
`;

const ModalBody = styled.div`
  text-align: center;
`;

const Button = styled.div`
  padding: 10px;
  cursor: pointer;
  display: block;
  text-align: center;
  border-radius: 5px;
  margin-top: 10px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
`;

// 로그인 된 유저의 콜렉션
const UserCollection: NextPage = () => {
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const userAddress = "0x2bc2C46165b64A3AF6A257B9fF882A1f7BeBc327"; //임시 주소

  const [modal, setModal] = useState(false);
  const [nftInfo, setNftInfo] = useState({
    id: 0,
    uri: "",
  });
  const [qrvalue, setQrvalue] = useState("DEFAULT");
  const priceInput = useInput(0);

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

  const onConfirm = () => {
    displayCard(userAddress, nftInfo.id, setQrvalue, (result) => {
      alert(JSON.stringify(result));
    });
  };

  useEffect(() => {
    fetchMyNFTs();
  }, []);

  return (
    <>
      <Title>콜렉션</Title>
      <h1>NFT 콜렉션</h1>

      <Modal
        show={modal}
        onClose={() => setModal(false)}
        title={`NFT #${nftInfo.id}`}
      >
        <ModalBody>
          <div
            style={{
              position: "relative",
              minHeight: "300px",
              minWidth: "300px",
            }}
          >
            <Image
              src={nftInfo.uri}
              alt="nft"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <Button onClick={onConfirm}>마켓에 올리기</Button>
          {qrvalue !== "DEFAULT" ? <QRCode value={qrvalue} /> : null}
        </ModalBody>
      </Modal>
      <Container>
        {nfts.map((nft, index) => (
          <CollectionCard
            key={`nft${nft.id}`}
            nftInfo={nft}
            onClick={() => {
              setModal(true);
              setNftInfo(nft);
              setQrvalue("DEFAULT");
            }}
          ></CollectionCard>
        ))}
      </Container>
    </>
  );
};

export default UserCollection;
function myAddress(
  myAddress: any,
  tokenID: any,
  setQrvalue: any,
  arg3: (result: any) => void
) {
  throw new Error("Function not implemented.");
}
function tokenID(
  myAddress: (
    myAddress: any,
    tokenID: any,
    setQrvalue: any,
    arg3: (result: any) => void
  ) => void,
  tokenID: any,
  setQrvalue: any,
  arg3: (result: any) => void
) {
  throw new Error("Function not implemented.");
}

function setQrvalue(
  myAddress: (
    myAddress: any,
    tokenID: any,
    setQrvalue: any,
    arg3: (result: any) => void
  ) => void,
  tokenID: any,
  setQrvalue: any,
  arg3: (result: any) => void
) {
  throw new Error("Function not implemented.");
}
