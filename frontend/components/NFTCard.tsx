import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 5px;
  padding: 10px;
  width: 25%;
`;

const NFTCard = ({
  artId,
  uri,
  price,
}: {
  artId: number;
  uri: string;
  price: number;
}) => (
  <Container>
    <Link href={`/market/${artId}`}>
      <a>
        <Image
          src={uri}
          alt="artId"
          width={200}
          height={200}
          objectFit="cover"
        />
        NFTID[{artId}]
        <br />
        {price}KLAY
      </a>
    </Link>
  </Container>
);

export default NFTCard;
