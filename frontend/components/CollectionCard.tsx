import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 5px;
`;

const CollectionCard = ({ artId, uri }: { artId: number; uri: string }) => (
  <Container>
    <img src={uri} alt={`NFT${artId}`}></img>
    <div>id:{artId}</div>
  </Container>
);

export default CollectionCard;
