import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 5px;
  padding: 10px
  margin: 1vw;
  margin-left: 0;
  width: 100%;
`;

const CardImage = styled(Image)`
  border-radius: 10px;
  cursor: pointer;
`;

const NFTCard = ({
  artId,
  uri,
  price,
  width,
}: {
  artId: number;
  uri: string;
  price: number;
  width?: number;
}) => (
  <Container style={{ width: `${width}%` }}>
    <Link href={`/market/${artId}`}>
      <a>
        <CardImage
          src={uri}
          alt="artId"
          width={200}
          height={200}
          objectFit="cover"
        />
        <br />
        NFTID[{artId}]
        <br />
        {price}KLAY
      </a>
    </Link>
  </Container>
);

export default NFTCard;
