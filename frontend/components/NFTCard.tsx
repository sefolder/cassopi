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
        <img src={uri} />
        NFTID[{artId}]
        <br />
        {price}KLAY
      </a>
    </Link>
  </Container>
);

export default NFTCard;
