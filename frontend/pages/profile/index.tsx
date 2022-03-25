import type { NextPage } from "next";
import { title } from "process";
import { useEffect, useState } from "react";
import { fetchCardsOf, getBalance } from "../../api/useCaver";
import { displayCard } from "../../api/useKlip";
import CollectionCard from "../../components/CollectionCard";
import Modal from "../../components/Modal";
import Title from "../../components/Title";
import QRCode from "qrcode.react";
import { useAppDispatch, useAppSelector, useInput } from "../../settings/hooks";
import styled from "styled-components";
import Image from "next/image";
import { setUserBalance } from "../../settings/slices/user";

const Container = styled.div`
  h1 {
    font-weight: bold;
    font-size: 1.8rem;
    margin: 20px 0px;
  }
`;

const Greeting = styled.h1`
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 20px;
`;

const Header = styled.div`
  display: flex;
`;

const AddressSpan = styled.span`
  font-size: 1rem;
  color: gray;
  margin-top: 5px;
`;

const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 30px 30px 0px;

  div {
    font-weight: bold;
    font-size: 1.5rem;
  }

  span {
    color: gray;
  }
`;

const CardsContainer = styled.div`
  padding: 20px;
  border-radius: 20px;
  display: flex;
  background-color: #8cd6c7;
  flex-wrap: wrap;
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
  margin-bottom: 5px;
`;

interface Imetadata {
  name: string;
  description: string;
  attributes: any;
}
interface Infts {
  id: number;
  image: string;
  metadata: Imetadata;
}

// 로그인 된 유저의 콜렉션
const UserCollection: NextPage = () => {
  const isLogin = useAppSelector((state) => state.user.isLogin);
  //const userAddress = "0x2bc2C46165b64A3AF6A257B9fF882A1f7BeBc327"; //임시 주소
  const userAddress = useAppSelector((state) => state.user.userAddress);
  const userBalance = useAppSelector((state) => state.user.userBalance);
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);
  const [nftInfo, setNftInfo] = useState<Infts>({
    id: 0,
    image: "",
    metadata: {
      name: "",
      description: "",
      attributes: [{}],
    },
  });
  const [qrvalue, setQrvalue] = useState("DEFAULT");
  const [username, setUsername] = useState("");

  const [nfts, setNfts] = useState<Infts[]>([
    {
      id: 0,
      image: "",
      metadata: {
        name: "",
        description: "",
        attributes: [{}],
      },
    },
  ]);

  const fetchMyNFTs = async () => {
    const _nfts = await fetchCardsOf(userAddress);

    for (let i = 0; i < _nfts.length; i++) {
      _nfts[i].id = Number(_nfts[i].id);
    }

    console.log("_nfts is ", _nfts);
    setNfts(_nfts);
  };

  const onConfirm = () => {
    displayCard(userAddress, nftInfo.id, setQrvalue, (result) => {
      alert(JSON.stringify(result));
      setModal(false);
    });
  };

  useEffect(() => {
    if (userAddress !== "0x0000000000") {
      fetchMyNFTs();
      //(async () => {
      //  let _balance = await getBalance(userAddress);
      //  dispatch(setUserBalance(_balance));
      //})();
    }
    if (userAddress === "0x2bc2C46165b64A3AF6A257B9fF882A1f7BeBc327")
      setUsername("ryeowon");
    else if (userAddress === "0x04eDD3CFE636cd7721c5C269C526f48E6c037A17")
      setUsername("sunny");
    else if (userAddress === "0x71b515c2aed4B59ccf93be7C1393C51228f0d89C")
      setUsername("summer");
    else if (userAddress === "0x746320b345a70969838279E2609b3F876d6a8898")
      setUsername("whybe");
    else if (userAddress === "0x1dC2d87790b33464d0FaEcD5d1a9f50E58fb8790")
      setUsername("seongwon");
    else if (userAddress === "0x6Bb4f5B5bf8E1edf40C64f789650369FFE7c9B21")
      setUsername("fly");
    else if (userAddress === "0x176071097C7D387fd99F56Afab54863BB3Ad44AF")
      setUsername("yuza");
    else setUsername("사용자");
  }, [userAddress]);

  return (
    <Container>
      <Title>내 프로필</Title>

      <Greeting>{username}님, 안녕하세요</Greeting>
      {username === "사용자" ? (
        <AddressSpan>
          닉네임을 등록하시고 싶은 분은 페이지 아래 오픈채팅방 링크를 통해
          문의해주세요.
          <br />
        </AddressSpan>
      ) : null}

      <br />
      <AddressSpan>
        My Address <br />
      </AddressSpan>
      <AddressSpan>{userAddress}</AddressSpan>

      <Header>
        <BalanceContainer>
          <span>Balance</span>
          <div>{userBalance} KLAY</div>
        </BalanceContainer>
        <BalanceContainer>
          <span>Royalty</span>
          <div>0 KLAY</div>
        </BalanceContainer>
      </Header>

      <h1>내 콜렉션</h1>
      {nfts.length ? (
        <CardsContainer>
          {nfts.map((nft, index) => {
            if (nft.id === 0) {
              return <>NFT를 불러오고 있습니다.</>
            }
            return (
              <CollectionCard
                key={`nft${nft.id}`}
                nftInfo={nft}
                onClick={() => {
                  console.log("nftInfo to cardscontainer is ", nft);
                  setModal(true);
                  setNftInfo(nft);
                  setQrvalue("DEFAULT");
                }}
              ></CollectionCard>
            )
          })}
        </CardsContainer>
      ) : (
        <>보유한 NFT가 없습니다</>
      )}
      <Modal
        show={modal}
        onClose={() => setModal(false)}
        title={`${nftInfo.metadata.name}`}
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
              src={nftInfo.image}
              alt="nft"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div>{nftInfo.metadata.description}</div>
          <Button onClick={onConfirm}>마켓에 올리기</Button>
          {qrvalue !== "DEFAULT" ? (
            <div>
              <QRCode value={qrvalue} />
              <br />
              NFT 가격은 3KLAY로 고정됩니다
            </div>
          ) : null}
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default UserCollection;
