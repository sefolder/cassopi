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

interface Imetadata {
  name: string;
  description: string;
  attributes: any;
}
interface Infts {
  id: string;
  image: string;
  metadata: Imetadata;
}

const CollectionCard = ({
  nftInfo,
  onClick,
}: {
  nftInfo: { id: number; image: string; metadata: Imetadata };
  onClick: () => void;
}) => (
  <Container onClick={onClick}>
    {nftInfo.image.length > 0 && (
      <>
        <CardImage
          src={nftInfo.image}
          alt={`NFT${nftInfo.id}`}
          width={200}
          height={200}
          objectFit="cover"
        ></CardImage>
        <br />
        {/*metadata is nftInfo.metadata*/}
      </>
    )}
  </Container>
);

export default CollectionCard;
