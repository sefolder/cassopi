import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 5px;
  padding: 10px;
  border: 1px solid gray;
  width: 25%;
`;

const NFTCard = ({ artId, price }: { artId: number; price: number }) => (
  <Container>
    <Link href={`/market/${artId}`}>
      <a>{artId}NFT</a>
    </Link>
    <br />
    {price}KLAY
  </Container>
);

export default NFTCard;
