import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  margin: 1vw;
  margin-left: 0;
`;

const Image = styled.img`
  border-radius: 10px;
  width: 100%;
  height: 100%;
`;

const CollectionCard = ({
  nftInfo,
  onClick,
}: {
  nftInfo: { id: number; uri: string };
  onClick: () => void;
}) => (
  <Container onClick={onClick}>
    <Image src={nftInfo.uri} alt={`NFT${nftInfo.id}`}></Image>
  </Container>
);

export default CollectionCard;
