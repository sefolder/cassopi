import type { NextPage } from "next";
import Title from "../components/Title";
import QRCode from "qrcode.react";
import { useState } from "react";
import { useAppDispatch, useAppSelector, useInput } from "../settings/hooks";
import * as KlipAPI from "../api/useKlip";
import styled from "styled-components";
import Image from "next/image";

const Bigtxt = styled.div`
  font-size: 40px;
  font-weight: bold;
  text-align: center;
`;
const Middletxt = styled.div`
  font-size: 28px;
  font-weight: bold;
`;
const Smalltxt = styled.div`
  font-size: 15px;
  color: darkgrey;
`;

const Container = styled.div`
  text-align: center;
`;

const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 60%;
  background-color: #fafafa;
  align-items: center;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const CardButton = styled.button`
  margin: 10px auto;
  padding: 5px;
  border-radius: 5px;
  background-color: skyblue;
  border: 1px solid skyblue;
  color: white;

  &:hover {
    cursor: pointer;
    background-color: white;
    color: skyblue;
  }
`;

const ImgWrapper = styled.div`
  position: relative;
  min-width: 500px;
  min-height: 500px;
`;

const DEFAULT_QR_CODE = "DEFAULT";
const DEFAULT_ADDRESS = "0x0000000000000000000000000000000000000000";

const Create: NextPage = () => {
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const [qrOn, setQrOn] = useState(false);
  const [mintImageUrl, setMintImageUrl] = useState("");
  const [mintTokenID, setMintTokenID] = useState("");

  const isLogin = useAppSelector((state) => state.user.isLogin);
  const userAddress = useAppSelector((state) => state.user.userAddress);
  const userBalance = useAppSelector((state) => state.user.userBalance);

  const onClickMint = async (metadataURL: string, tokenID: number) => {
    if (userAddress === DEFAULT_ADDRESS) {
      alert("NO ADDRESS");
      return;
    }
    //const randomTokenId = Math.round(Math.random() * 10000000);
    console.log("metadataURL is ", metadataURL);
    KlipAPI.mintCardWithURI(
      userAddress,
      //randomTokenId,
      tokenID,
      metadataURL,
      setQrvalue,
      (result) => {
        alert(JSON.stringify(result));
      }
    );
  };

  return (
    <>
      <Title>Create</Title>
      {userAddress === "0x746320b345a70969838279E2609b3F876d6a8898" ||
      userAddress === "0x2bc2C46165b64A3AF6A257B9fF882A1f7BeBc327" ? (
        <>
          {qrvalue !== "DEFAULT" ? (
            <div
              style={{
                backgroundColor: "white",
                width: 300,
                height: 300,
                padding: 20,
              }}
            >
              <QRCode value={qrvalue} size={256} style={{ margin: "auto" }} />
            </div>
          ) : null}
          <br />
          <br />
          <Bigtxt>Create New NFT</Bigtxt>
          <br />
          <br />
          <Middletxt>파일 업로드</Middletxt>
          <br />
          <Smalltxt>
            NFT에 넣을 이미지/영상 파일을 업로드해주세요. 최대 10MB까지 업로드할
            수 있으며, 지원하는 파일 포맷은 아래와 같습니다.
            <br />
            - 이미지: PNG, JPG, JPEG, GIF, WEBP (가로 세로 사이즈 600px 이상)
            <br />- 영상: MP4 (가로 세로 사이즈 600px 이상)
          </Smalltxt>
          <br />
          {/* 파일 업로드 */}
          <Card>
            {mintImageUrl !== "" ? (
              <ImgWrapper>
                <Image
                  src={mintImageUrl}
                  alt="Image to Mint"
                  layout="fill"
                  objectFit="contain"
                />
              </ImgWrapper>
            ) : null}
            <form
              onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                onClickMint(mintImageUrl, parseInt(mintTokenID));
              }}
            >
              <div
                style={{ alignItems: "center", width: "90%", margin: "0 auto" }}
              >
                <br />
                <input
                  //value={mintImageUrl}
                  onChange={(e) => {
                    console.log("new image: ", e.target.value);
                    let tempURL =
                      "https://ipfs.io/ipfs/" + e.target.value.slice(7); //delete "ipfs://"
                    console.log("tempURL = ", tempURL);
                    setMintImageUrl(tempURL);
                  }}
                  type="text"
                  placeholder="메타데이터 URI 주소를 입력해주세요"
                  style={{ alignItems: "center", width: "100%" }}
                />
                <br />
                <br />
                <input
                  value={mintTokenID}
                  onChange={(e) => {
                    console.log("token ID: ", e.target.value);
                    setMintTokenID(e.target.value);
                  }}
                  type="text"
                  placeholder="토큰 ID를 입력해주세요"
                  style={{ alignItems: "center", width: "100%" }}
                />
                배정된 Token ID 범위 : 1~
                <br />
                사용 완료 : 1,2
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <CardButton>발행하기</CardButton>
              </div>
            </form>
          </Card>
          {/* 이름 - 최대 50자*/}
          {/* 설명 - 최대 130자*/}
          {/* 정보 수집 이용 동의 ((NFT이름, 설명, 파일), 영구, 규정위반/요청 시 파기, NFT 발행 및 관리 목적) */}
          {/* 유의사항 확인 및 동의 - 저작권, 개인정보, 이용약관/운영정책 반하지 않음, 부적절한 파일 삭제 */}
          {/* NFT 미리보기 (마켓플레이스에 올라왔을 때 어떻게 보일지) */}
        </>
      ) : (
        <>
          <Container>
            <a href="https://open.kakao.com/o/srxUQhXd">
              <Image
                src="/notice.png"
                alt="minting_notice"
                width={550}
                height={700}
              />
            </a>
          </Container>
        </>
      )}
    </>
  );
};

export default Create;
