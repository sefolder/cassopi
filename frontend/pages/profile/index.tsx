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

// 로그인 된 유저의 콜렉션
const UserCollection: NextPage = () => {
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const userAddress = "0x2bc2C46165b64A3AF6A257B9fF882A1f7BeBc327"; //임시 주소

  const [modal, setModal] = useState(false);
  const [nftId, setNftId] = useState(0);
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
    displayCard(userAddress, nftId, setQrvalue, (result) => {
      alert(JSON.stringify(result));
    });
  };

  useEffect(() => {
    fetchMyNFTs();
  }, []);

  return (
    <>
      <Title>콜렉션</Title>
      <h1>콜렉션</h1>

      <Modal show={modal} onClose={() => setModal(false)} title="">
        <div>
          {/* <input type="number" placeholder="가격 입력" {...priceInput} />
          KLAY */}
          <button onClick={onConfirm}>마켓에 올리기</button>
          {qrvalue !== "DEFAULT" ? <QRCode value={qrvalue} /> : null}
        </div>
      </Modal>

      {nfts.map((nft, index) => (
        <CollectionCard
          key={`nft${nft.id}`}
          artId={nft.id}
          uri={nft.uri}
          onClick={() => {
            setModal(true);
            setNftId(nft.id);
          }}
        ></CollectionCard>
      ))}
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
