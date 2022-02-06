import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 5px;
  cursor: pointer;
`;

const CollectionCard = ({
  artId,
  uri,
  onClick,
}: {
  artId: number;
  uri: string;
  onClick: () => void;
}) => (
  <Container onClick={onClick}>
    <img src={uri} alt={`NFT${artId}`}></img>
    <div>id:{artId}</div>
  </Container>
);

export default CollectionCard;
