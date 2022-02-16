import type { NextPage } from "next";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import Title from "../../components/Title";
import * as KlipAPI from "../../api/useKlip";
import QRCode from "qrcode.react";
import { useAppSelector } from "../../settings/hooks";
import styled from "styled-components";
import Image from "next/image";
import { useEffect } from "react";
import { fetchCardsOf, fetchNFTIds, fetchNFTInfo } from "../../api/useCaver";
import Modal from "../../components/Modal";

const InfoCWrapper = styled.div``;

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 200px;
`;

const NFTContainer = styled.div`
  min-height: 500px;
  position: relative;
  cursor: pointer;
`;

const PriceContainer = styled.div`
  padding: 12px;
  border: 1px solid gray;
  border-radius: 5px;
  min-width: 320px;
  text-align: center;
  height: 110px;

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

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;

  h1 {
    font-weight: bold;
    font-size: 2rem;
    margin-right: 20px;
  }

  span {
    font-size: 1rem;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;

  span {
    font-weight: bold;
    font-size: 1.2rem;
    margin-left: 15px;
  }
`;

const Descriptions = styled.div`
  margin-top: 20px;
  line-height: 20px;
  color: gray;
`;

const ProfileImg = styled(Image)`
  border-radius: 100%;
`;

const NFTImg = styled(Image);

const Price = styled.div`
  font-weight: bold;
  font-size: 2rem;
  color: black;
`;

const PriceLabel = styled.div`
  color: gray;
  height: 20px;
`;

interface Imetadata {
  name: string;
  description: string;
  attributes: any;
}
interface Infts {
  image: string;
  metadata: Imetadata;
}

const Art: NextPage = () => {
  const {
    query: { artId },
  } = useRouter();

  const isLogin = useAppSelector((state) => state.user.isLogin);
  const userAddress = useAppSelector((state) => state.user.userAddress);
  const userBalance = useAppSelector((state) => state.user.userBalance);
  const [qrvalue, setQrvalue] = useState("DEFAULT");
  const [modal, setModal] = useState(false);
  const [nftInfo, setMetadata] = useState({
    image: "",
    metadata: {
      name: "",
      description: "",
      attributes: [],
    },
  });

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

  useEffect(() => {
    (async () => {
      if (artId) setMetadata(await fetchNFTInfo(artId as string));
    })();
  }, [artId]);

  return (
    <>
      <Title>{artId}</Title>
      <NFTContainer onClick={() => setModal(true)}>
        {nftInfo.image !== "" ? (
          <Image
            src={nftInfo.image}
            alt="NFT"
            layout="fill"
            objectFit="cover"
          />
        ) : null}
      </NFTContainer>
      <TextWrapper>
        <InfoCWrapper>
          <TitleContainer>
            <h1>{nftInfo.metadata.name}</h1>
            <span>#{artId}</span>
          </TitleContainer>
          <ProfileContainer>
            <ProfileImg
              alt="profile"
              src="../home_banner_cropped.png"
              width={50}
              height={50}
              objectFit="cover"
            />
            <span>심윤보</span>
          </ProfileContainer>
          <Descriptions>{nftInfo.metadata.description}</Descriptions>
        </InfoCWrapper>
        <PriceContainer>
          <div>
            <PriceLabel>판매가</PriceLabel>
            <Price>0.01 KLAY</Price>
          </div>
          <button onClick={BuyCard}>구매하기</button>
          <br />
          <br />
          {qrvalue !== "DEFAULT" ? <QRCode value={qrvalue} /> : null}
        </PriceContainer>
      </TextWrapper>
      <Modal
        show={modal}
        onClose={() => setModal(false)}
        title={`NFT #${artId}`}
      >
        <div
          style={{
            position: "relative",
            minHeight: "500px",
            minWidth: "500px",
          }}
        >
          <Image
            src={nftInfo.image}
            alt="nft"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </Modal>
    </>
  );
};

export default Art;

/*
export async function getStaticPaths() {
  return {
    paths: [
      { params: { artId: "1" } },
      { params: { artId: "7420586" } },
      { params: { artId: "8401191" } },
      { params: { artId: "8096025" } },
      { params: { artId: "6281016" } },
    ],
    fallback: false,
  };
}
*/

export async function getStaticPaths() {
  const ids = await fetchNFTIds(process.env.NEXT_PUBLIC_MARKET_CONTRACT);

  const path = ids.map((id) => {
    return { params: { artId: id } };
  });

  console.log(path);

  return {
    paths: path,
    fallback: false,
  };
}

export const getStaticProps = async ({ params }: { params: any }) => {
  //페이지에 props로 보냄
  return { props: { id: params.artId } };
};
