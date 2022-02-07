import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  margin: 1vw;
  margin-left: 0;
`;

const CardImage = styled(Image)`
  border-radius: 10px;
`;

const CollectionCard = ({
  nftInfo,
  onClick,
}: {
  nftInfo: { id: number; uri: string };
  onClick: () => void;
}) => (
  <Container onClick={onClick}>
    {nftInfo.uri.length > 0 && (
      <CardImage
        src={nftInfo.uri}
        alt={`NFT${nftInfo.id}`}
        width={200}
        height={200}
        objectFit="cover"
      ></CardImage>
    )}
  </Container>
);

export default CollectionCard;
